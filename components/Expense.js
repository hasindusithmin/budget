import { useEffect, useState } from "react"


export default function Expense({ name, value }) {

    const [total, setTotal] = useState(null)

    if (total == null) {
        let __ = 0;
        Object.values(value).map(_ => __ += parseFloat(_))
        setTotal(__)
    }

    return (
        <>
            <table className="w3-table-all w3-border">
                <caption >{name.replaceAll('_', ' ')}</caption>
                <tr key={name} className="w3-green">
                    <th>Description</th>
                    <th>Amount</th>
                </tr>
                {
                    Object.entries(value).map(([k, v]) =>
                        <tr key={k}>
                            <td>{k.replaceAll('_', ' ')}</td>
                            <td>{v}</td>
                        </tr>
                    )
                }

                {
                    total && <tr> <td>Total</td> <td>{total}</td> </tr>
                }
            </table>
            <hr className="w3-clear" />
        </>
    )

}