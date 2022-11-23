import { useEffect, useState } from "react";
import { countries, postcodes, townships } from "../../../data/townships";

function TWZipCode(props) {
    const { fields, setFields } = props;

    // console.log(fields.county);
    // console.log(fields.area);

    // 代表目前被選中的縣市的索引值
    // 注意資料類型都是數字(索引值是數字)
    // -1代表目前沒有選中任何的陣列中的值

    const [country, setCountry] = useState(-1);
    const [township, setTownship] = useState(-1);

    const [countyValues, setCountyValues] = useState(-1);
    const [townshipValues, setTownshipValues] = useState(-1);

    useEffect(() => {
        if (fields.county !== "") {
            const city = countries.findIndex((v) => v === fields.county);
            setCountry(city);
            const area = townships[city].findIndex((v) => v === fields.area);
            setTownship(area);
        }
    }, []);

    return (
        <>
            <select
                value={country ? country : -1}
                className="county"
                onChange={(e) => {
                    // 將字串轉成數字
                    setCountry(+e.target.value);
                    // 重置township的值
                    setTownship(-1);

                    setFields({
                        ...fields,
                        [e.target.className]: countries[e.target.value],
                        // [e.target.className]: e.target.value,
                    });
                }}
            >
                <option value="-1">選擇縣市</option>
                {countries.map((value, index) => (
                    <option key={index} value={index}>
                        {value}
                    </option>
                ))}
            </select>
            <select
                value={township ? township : -1}
                className="area"
                onChange={(e) => {
                    // 將字串轉成數字
                    setTownship(+e.target.value);
                    setFields({
                        ...fields,
                        [e.target.className]:
                            townships[country][e.target.value],
                        // [e.target.className]: e.target.value,
                    });
                }}
            >
                <option value="-1">選擇區域</option>
                {country > -1 &&
                    townships[country].map((value, index) => (
                        <option key={index} value={index}>
                            {value}
                        </option>
                    ))}
            </select>
            {/* 如果country與township的索引值均大於-1時(也就是都有選的情況下)，呈現postcode */}
            {/* `條件 && 呈現` 是 `if(條件){呈現}` 的簡寫法，只在React JSX中可以使用 */}
        </>
    );
}

export default TWZipCode;
