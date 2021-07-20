import React, { useState,useEffect } from 'react'
import {Line} from 'react-chartjs-2'

function LineGraph() {

    const [data, setData]=useState({});

    const buildChartData=(data,casesType='cases') => {
        const chartData =[];
        let lastDataPoint;

        for (let date in data.cases){
            if(lastDataPoint){
                const newDataPoint={
                    x: date,
                    y: data[casesType][date]-  lastDataPoint
                }
                chartData.push(newDataPoint);
            }
            lastDataPoint = data[casesType][date]
        };
        return chartData
    }



    useEffect(()=>{
        fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
        .then(responce=>responce.json())
        .then(data =>{
            const chartData=buildChartData(data)
            setData(chartData)
        })
    },[])



    return (
        <div>
            <h1>I am a graph</h1>
            <Line 
                data={{
                    datasets: [
                        {
                            backgroundColor: 'red',
                            borderColor: 'yellow',
                            data: data
                        }
                    ]
            }}/>
        </div>
    )
}

export default LineGraph;
