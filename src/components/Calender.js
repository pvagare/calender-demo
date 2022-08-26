import React from "react";
import { getTimeZones, getTimes, getDays } from "../redux/actions/index.js";
import { useState } from "react";
import { connect } from "react-redux";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Calender(props) {
    const today = new Date();
    // const numberOfDaysToAdd = 3;
    // const date = today.setDate(today.getDate() + numberOfDaysToAdd);
    const defaultValue = today.toISOString().split('T')[0]
    let [currentDate, setCurrentDate] = useState();
    let [oldPrevDate, setOldPrevDate] = useState();

    let [weekDaysArray, setWeekDaysArray] = useState([]);

    useState(() => {
        setCurrentDate(defaultValue)
        props.getTimes();
        props.getTimeZones();
        today.getDay();
        
        let items = []
        for (let index = today.getDay(); index <= 5; index++) {
            var item = {
                timeZone: props.timeList,
                dayName: props.days[index - 1]
            }
            items.push(item)
        }
        setWeekDaysArray(items)
        setOldPrevDate(today);
    }, []);

    const onTimeSelect = (e) => {

    }
    // let day = today.getDay();

    const renderItems = (item) => {
        return (item.map((current) => {
            return <Form className="formDisplayContainer">
                <Form.Group className="mb-3 formDisplay" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label={current} />
                </Form.Group>

            </Form>
        }))
    }

    const selectCurrentDate = (item) => {
        setCurrentDate(item.currentTarget.value);
        oldPrevDate(new Date(item.currentTarget.value));
    }

    const prevWeek = (item) => {

        var d = new Date(oldPrevDate);
        d.setDate(d.getDate() + (((1 - 7 - d.getDay()) % 7) || 7));
        console.log(d);

        let items = [];
        var nextDate = d;
        var firstTime = true;

        for (let index = d.getDay(); index <= 5; index++) {
            if (firstTime === false) {
                nextDate.setDate(nextDate.getDate() - 1);
            }
            firstTime = false;
            let name = nextDate.toLocaleDateString('en-us', { weekday: 'short' });
            var item = {
                timeZone: props.timeList,
                dayName: name,
                date: (nextDate.getMonth() + 1) + "/" + nextDate.getDate()
            }
            items.push(item)
        }
        setWeekDaysArray(items)

        setOldPrevDate(nextDate);
    }

    const nextWeek = (item) => {

        var d = new Date(oldPrevDate);
        d.setDate(d.getDate() + (((1 + 7 - d.getDay()) % 7) || 7));
        console.log(d);

        let items = [];
        var nextDate = d;
        var firstTime = true;

        for (let index = d.getDay(); index <= 5; index++) {
            if (firstTime === false) {
                nextDate.setDate(nextDate.getDate() + 1);
            }
            firstTime = false;
            let name = nextDate.toLocaleDateString('en-us', { weekday: 'short' });
            var item = {
                timeZone: props.timeList,
                dayName: name,
                date: (nextDate.getMonth() + 1) + "/" + nextDate.getDate()
            }
            items.push(item)
        }
        setWeekDaysArray(items)

        setOldPrevDate(nextDate);
    }

    return (
        <Container style={{ marginTop: 50 }}>
            <Row>
                <Col md={3}>  <Button variant="primary" onClick={prevWeek}>Previous Week</Button> </Col>
                <Col md={6}>  <input type={"date"} onChange={selectCurrentDate} defaultValue={currentDate}></input></Col>
                <Col md={3}>  <Button variant="primary" onClick={nextWeek}>Next Week</Button></Col>
            </Row>
            <Row>
                <Col>
                    <div className="marginTop50"> Timezones: </div>
                    <select className="time-zone" onChange={onTimeSelect}>
                        {
                            props.timeZones.map((item) => {
                                return <option value={item.value}> {item.name} </option>
                            })
                        }
                    </select>
                </Col>
            </Row>
            <Row className="days-container">
                {
                    weekDaysArray.map(item => {
                        return <Row className="days">
                            <Col md={3} className="backgroundColor">
                                <div>
                                    {
                                        item.dayName
                                    }
                                </div>
                                <div>
                                    {
                                        item.date
                                    }
                                </div>

                            </Col>

                            <Col md={9} className="timesColors">

                                {renderItems(item.timeZone)}
                            </Col>

                        </Row>

                    })
                }

            </Row>
        </Container>
    )

}


const mapStateToProps = (state) => {
    return {
        timeList: state.feature.timeList,
        timeZones: state.feature.timeZones,
        days: state.feature.days
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        getTimeZones: (payload) => dispatch(getTimeZones(payload)),
        getTimes: (payload) => dispatch(getTimes(payload)),
        getDays: (payload) => dispatch(getDays(payload)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Calender);