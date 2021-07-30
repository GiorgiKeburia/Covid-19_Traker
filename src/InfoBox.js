import React from 'react'
import "./infoBox.css"
import { 
    Card,
    CardContent,
    Typography,
  } from '@material-ui/core';

function infoBox({ title, cases,active, total, ...props}) {
    return (
        <Card onClick={props.onClick} className={`infoBox ${active && "infoBox--selected"}`}>
            <CardContent>
                {/* Title */}

                <Typography className="infoBox__title" color="textSecondary">
                    {title}
                </Typography>

                {/* Numbers */}

                <h2 className="infoBox__cases">{cases}</h2>

                {/* Total */}

                <Typography className="infoBox__total" color="textSecondary">
                    {total} Total
                </Typography>

            </CardContent>
            
        </Card>
    )
}

export default infoBox
