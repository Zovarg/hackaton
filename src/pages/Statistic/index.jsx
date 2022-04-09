import React, {useEffect, useState} from "react";
import { Chart } from "react-google-charts";
import {useFetching} from "../../hooks/useFetching";
import api from "../../services/api";
import cl from "./Static.module.css"

const Statistic = () => {
    const [stats, setStats]=useState({})
    const [fetchPosts,isPostsLoading,postError]=useFetching(async()=>{
        const raw_data=await api.auth.getStats();
        setStats(raw_data.data)
    })
    useEffect(()=>{
        fetchPosts()
    },[])

    let data = []
    for (let day in stats["user-request-dynamics"]) {
        data.push([day, stats["user-request-dynamics"][day], stats["operator-review-dynamics"][day]])

    }
     let newData1 = [
        ['Дата', 'Отзывы', 'Ответы'],
        ...data
    ];

    let dataOpen = []
    for (let day in stats["open-requests-dynamics"]) {
        dataOpen.push([day, stats["open-requests-dynamics"][day]])
    }
    let newData2 = [
        ['Дата', 'Кол-во открытых обращений'],
        ...dataOpen
    ];

    const options1 = {
        chart: {
            title: "Статистика",
            subtitle: "Обращения - Ответы за месяц",
        },
    };
    const options2 = {
        chart: {
            title: "График открытых обращений",
        },
    };
return (
    <div className={cl.container}>
        <Chart
            chartType="Bar"
            width="100%"
            height="400px"
            data={newData1}
            options={options1}
        />
        <div>Кол-во открытых обращений: {stats["count-open-requests"]}</div>
        <Chart
            chartType="Line"
            width="100%"
            height="400px"
            data={newData2}
            options={options2}
        />
    </div>
    )
};

export default Statistic;