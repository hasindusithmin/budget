import { useEffect, useState } from "react"
import budget from "../public/budget.json"
import Expense from "../components/Expense";

export default function Home() {

  const [income, setIncome] = useState(null);
  const [expenses, setExpenses] = useState(null)
  const [expen, setExpen] = useState(null)
  const [totalIncome, setTotalIncome] = useState(null);
  const [totalExpense, setTotalExpense] = useState(null);
  const [balance,setBalance] = useState(null)

  useEffect(() => {
    setIncome(budget['income'])
    setExpenses(budget['expenses'])
    let tI = 0
    Object.values(budget['income']).forEach(elem => {
      tI += elem;
    })
    setTotalIncome(tI)
    let tE = 0;
    const exObj = {}
    Object.entries(budget['expenses']).forEach(([key,value]) => {
      let total = 0;
      Object.values(value).forEach(elem=> total += parseFloat(elem))
      exObj[key] = total;
      tE += total;
    })
    setExpen(exObj)
    setTotalExpense(tE)
    setBalance(tI - tE)
    
  }, [])

  return (
    <div className="w3-content w3-panel">
      <table className="w3-table-all w3-border">
        <thead>
          <tr className="w3-green">
            <td>Description</td>
            <td>Expenses</td>
            <td>Income</td>
          </tr>
        </thead>
        <tbody>
          {
            income &&
            Object.entries(income).map(([key, value]) =>
              <tr key={key}>
                <td>{key.replaceAll('_', ' ')}</td>
                <td></td>
                <td>{value}</td>
              </tr>
            )
          }
          {
            totalIncome && <tr key="total-income"> <td>Total</td> <td></td> <td>{totalIncome}</td> </tr>
          }
          {
            expen &&
            Object.entries(expen).map(([key, value]) =>
              <tr key={key}>
                <td>{key.replaceAll('_', ' ')}</td>
                <td>{value}</td>
                <td></td>
              </tr>
            )
          }
          {
            totalExpense && <tr key="total-expense"> <td>Total</td> <td>{totalExpense}</td> <td>{totalIncome}</td> </tr>
          }
          {
            balance && <tr key="balance"> <td>Balance</td> <td></td> <td>{balance}</td> </tr>
          }

        </tbody>
      </table>
      <hr className="w3-clear"/>
      {
        expenses &&
        Object.entries(expenses).map(([key,value])=><Expense key={key} name={key} value={value} />)
      }
    </div>
  )
}