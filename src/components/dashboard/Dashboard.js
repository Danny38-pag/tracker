import Chart from '../chart/Chart'
import { useGlobalContext } from '../../context/GlobalContext';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { InnerLayout } from '../../styles/layout';
import { dollar, income } from '../../utils/Icons';
import History from '../../history/History';
import './style.css'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { useSelector } from "react-redux";

function Dashboard() {
    const { incomes, expenses, transactionHistory, getIncome, getExpense, } = useGlobalContext()
    const [expenseData, setExpenseData] = useState(null)
    const [incomeData, setIncomeData] = useState(null)
    // useEffect(() => {
    //     getIncome()
    //     // getExpense()
    // }, [])
    
    const user = useSelector(state => state.UserHolder)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/v1/get-expense/${user._id}`);
                setExpenseData(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
        // getExpense()
    }, [user])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/v1/get-income/${user._id}`);
                setIncomeData(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
        // getExpense()
    }, [user])
    const totalExpense1 = () => {
        let totalExpense1 = 0;
        expenseData?.forEach((expense) => {
            totalExpense1 = totalExpense1 + expense.amount
        })
        return totalExpense1
    }
    const totalIncome = () => {
        let totalIncome = 0;
        incomeData?.forEach((income) => {
            totalIncome = totalIncome + income.amount
        })
        return totalIncome
    }
    const totalBalance = () => {
        return Math.max(0, totalIncome() - totalExpense1());
    }

    // const transactionHistory = () => {
    //     const history = [...incomes, ...expenses]
    //     history.sort((a, b) => {
    //         return new Date(b.createdAt) - new Date(a.createdAt)
    //     })
    //     return history.slice(0, 3)
    // }
    return (
        <div>
            <div id='dash_holder'>
                <h1>All Transactions</h1>
                <div className='stats-con'>
                <Row>
                    <Col md>
                        <div className='chat_holder'>
                            <Chart />
                        </div>

                            <div className='amount-con'>
                                <div className='income'>
                                    <h2>Total Income </h2>
                                    <p>
                                        { dollar } { totalIncome() }
                                    </p>
                                </div>
                                <div className='expense'>
                                    <h2>Total Expense </h2>
                                    <p>
                                        { dollar } { totalExpense1()  }
                                    </p>
                                </div>
                                <div className='balance'>
                                    <h2>Total Balance </h2>
                                    <p>
                                        { dollar } { totalBalance() }
                                    </p>
                                </div>
                            </div>
                    </Col>
                    <Col md>
                            <History />
                            <h2 className='salary-title'>Min <span> Income </span> Max</h2>
                            <div className='salary-item'>
                                <p>
                                    { Math.min(0, Math.min(...incomes.map((item) => item.amount))) }
                                </p>
                                <p>
                                    { Math.max(0, Math.max(...incomes.map((item) => item.amount))) }
                                </p>
                            </div>
                            <h2 className='salary-title'>Min <span> Expense </span> Max</h2>
                            <div className='salary-item'>
                                <p>
                                    { Math.min(0, Math.min(...expenses.map((item) => item.amount))) }
                                </p>
                                <p>
                                    { Math.max(0, Math.max(...expenses.map((item) => item.amount))) }
                                </p>
                            </div>
                    </Col>
                
                    {/* <div className='chart-con'>

                        <Chart />

                        <div className='amount-con'>
                            <div className='income'>
                                <h2>Total Income </h2>
                                <p>
                                    { dollar } { totalIncome() }
                                </p>
                            </div>
                            <div className='expense'>
                                <h2>Total Expense </h2>
                                <p>
                                    { dollar } { totalExpense() }
                                </p>
                            </div>
                            <div className='balance'>
                                <h2>Total Balance </h2>
                                <p>
                                    { dollar } { totalBalance() }
                                </p>
                            </div>
                        </div>

                    </div>
                    <div className='history-con'>
                        <History />
                        <h2 className='salary-title'>Min <span> Income </span> Max</h2>
                        <div className='salary-item'>
                            <p>
                                { Math.min(0, Math.min(...incomes.map((item) => item.amount))) }
                            </p>
                            <p>
                                { Math.max(0, Math.max(...incomes.map((item) => item.amount))) }
                            </p>
                        </div>
                        <h2 className='salary-title'>Min <span> Expense </span> Max</h2>
                        <div className='salary-item'>
                            <p>
                                { Math.min(0, Math.min(...expenses.map((item) => item.amount))) }
                            </p>
                            <p>
                                { Math.max(0, Math.max(...expenses.map((item) => item.amount))) }
                            </p>
                        </div>
                    </div> */}
                    </Row>
                </div>
            </div>
        </div>
    )
}

// const div = styled.div`
// .stats-con{
//     display: grid;
//     grid-template-columns: repeat(5, 1fr);
//     gap: 2rem;
//     .chart-con{
//         grid-column: 1/4;
//         height: 400px;
//         .amount-con{
//             display: grid;
//             grid-template-columns: repeat(4,1fr);
//             gap: 2rem;
//             margin-top: 2rem;
//             .income, .expense{
//                 grid-column: span 2;   
//             }
//             .income, .expense, .balance{
//                 background: #fcf6f9;
//                 border: 2px  solid #ffffff;
//                 box-shadow: 0px 1px 15px rgba(0,0,0,0.06);
//                 padding: 1rem;
//                 border-radius: 20px;
//                 p{
//                     font-size: 3.5rem;
//                     font-weight: 700;
//                 }
//             }
//             .balance{
//                 grid-column: 2/4;
//                 display: flex;
//                 flex-direction: column;
//                 justify-content: center;
//                 align-items: center;
//                 p{
//                     color: green;
//                     opacity: 0.6;
//                     font-size: 4.5rem
//                 }
//             }
//         }
//     }
//     .history-con{
//         grid-column: 4/ -1;
//         h2{
//             margin: 1rem 0;
//             display: flex;
//             align-items: center;
//             justify-content: space-between;

//         }
//         .salary-title{
//             font-size: 1.2rem;
//             span{
//                 font-size: 1.8rem
//             }
//         }
//         .salary-item{
//             background: #fcf6f9;
//             border: 2px  solid #ffffff;
//             box-shadow: 0px 1px 15px rgba(0,0,0,0.06);
//             padding: 1rem;
//             border-radius: 20px;
//             display: flex;
//             justify-content: space-between;
//             align-items: center;
//             p{
//                 font-weight: 600;
//                 font-size: 1.6rem;

//             }
//         }
//     }
// }
// `;

export default Dashboard;