import React from "react";
import "./InfoBox.css";
import { Card, CardContent, Typography } from "@material-ui/core";


function InfoBox({ title, cases,isRed, active, total, onClick }) {
  return (
    <Card onClick={onClick} className={`infoBox ${active && "infoBox--selected"}  ${isRed && "infoBox--red"}`}>
        <CardContent>
            <Typography className="infoBox__title" color="textSecondary">
                {title}
            </Typography>

            <h2 className={`infoBox__cases ${!isRed && "infoBox_cases--green"}`}>{cases}</h2>
            <Typography className="infoBox__total" color="textSecondary">{
            total} Total
            </Typography>
        </CardContent>
    </Card>
  );
}

export default InfoBox;