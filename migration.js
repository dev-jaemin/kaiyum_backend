import { getConnection } from "./src/model/db/database.js";
import axios from "axios";

const getData = async () => {
    const urls = {
        ueon: [
            "https://map.naver.com/v5/api/search?caller=pcweb&query=%EC%9D%8C%EC%8B%9D%EC%A0%90&type=place&searchCoord=127.3573019083467;36.36338961130774&page=1&displayCount=100&boundary=127.35676664395487;36.36192760110353;127.35958497481079;36.36481640826375&lang=ko",
            "https://map.naver.com/v5/api/search?caller=pcweb&query=%EC%9D%8C%EC%8B%9D%EC%A0%90&type=place&searchCoord=127.3573019083467;36.36338961130774&page=6&displayCount=20&boundary=127.35676664395487;36.36192760110353;127.35958497481079;36.36481640826375&lang=ko",
        ],
        ugoong: [
            "https://map.naver.com/v5/api/search?caller=pcweb&query=%EC%9D%8C%EC%8B%9D%EC%A0%90&type=place&searchCoord=127.35261577703795;36.36225611353076&page=1&displayCount=100&boundary=127.35225515677763;36.360658886569425;127.35555225631992;36.363801451275876&lang=ko",
        ],
        goong: [
            "https://map.naver.com/v5/api/search?caller=pcweb&query=%EC%9D%8C%EC%8B%9D%EC%A0%90&type=place&searchCoord=127.3491061691143;36.36249984331363&page=1&displayCount=100&boundary=127.3487455488513;36.360902621353276;127.35204264839524;36.36404517621747&lang=ko",
            "https://map.naver.com/v5/api/search?caller=pcweb&query=%EC%9D%8C%EC%8B%9D%EC%A0%90&type=place&searchCoord=127.3491061691143;36.36249984331363&page=2&displayCount=100&boundary=127.3487455488513;36.360902621353276;127.35204264839524;36.36404517621747&lang=ko",
            "https://map.naver.com/v5/api/search?caller=pcweb&query=%EC%9D%8C%EC%8B%9D%EC%A0%90&type=place&searchCoord=127.3491061691143;36.36249984331363&page=3&displayCount=100&boundary=127.3487455488513;36.360902621353276;127.35204264839524;36.36404517621747&lang=ko",
        ],
        bongmyung: [
            "https://map.naver.com/v5/api/search?caller=pcweb&query=%EC%9D%8C%EC%8B%9D%EC%A0%90&type=place&searchCoord=127.3504421567037;36.35804003252866&page=1&displayCount=100&boundary=127.34997513540401;36.355971425327766;127.35424504438555;36.360041424832446&lang=ko",
        ],
    };

    try {
        Object.keys(urls).forEach((key) => {
            urls[key].forEach(async (url) => {
                let data = {};

                data = await axios.get(url);

                // name, tel, roadAddress, x, y
                data.data.result.place.list.forEach(async (element) => {
                    let value = {
                        name: element.name,
                        tel: element.tel,
                        roadAddress: element.roadAddress,
                        x: element.x,
                        y: element.y,
                        img: element.thumUrl,
                    };

                    try {
                        await getConnection(`INSERT INTO kaiyum.restaurant(name, tel, x, y, roadaddress, img, location) VALUES(?, ?, ?, ? ,? ,?, ?)`, [
                            value.name,
                            value.tel,
                            value.x,
                            value.y,
                            value.roadAddress,
                            value.img,
                            key,
                        ]);
                    } catch (e) {
                        console.error(e);
                    }
                });
            });
        });
    } catch (e) {
        console.error(e);
    }
};

getData();
