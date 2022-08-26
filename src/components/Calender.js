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
    const defaultValue = today.toISOString().split('T')[0];

    let [currentDate, setCurrentDate] = useState();
    let [oldPrevDate, setOldPrevDate] = useState();
    let [timezone, setTimezone] = useState(5.30);

    let [weekDaysArray, setWeekDaysArray] = useState([]);


    const getMondayOfCurrentWeek = () => {
        const today = new Date();
        const first = today.getDate() - today.getDay() + 1;
        const monday = new Date(today.setDate(first));
        return monday;
    }

    useState(() => {
        setCurrentDate(defaultValue)
        props.getTimes();
        props.getTimeZones();
        today.getDay();
        let name = today.toLocaleDateString('en-us', { weekday: 'short' });
        let items = []
        let currentMonday = getMondayOfCurrentWeek();

        for (let index = currentMonday.getDay(); index <= 5; index++) {
            var item = {
                timeZone: props.timeList,
                dayName: name,
                date: (currentMonday.getMonth() + 1) + "/" + currentMonday.getDate(),
                isPast: false
            }

            if (today > currentMonday) {
                item.isPast = true
            }

            items.push(item)
            currentMonday.setDate(currentMonday.getDate() + 1);

        }
        setWeekDaysArray(items)
        setOldPrevDate(today);
        setTimezone(5.30);
    }, []);

    const onTimeSelect = (e) => {
        setTimezone(e.currentTarget.value);
    }

    const renderItems = (item) => {
        return (item.map((current) => {
            return <Form className="formDisplayContainer">
                <Form.Group className="mb-3 formDisplay" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label={current} />
                </Form.Group>

            </Form>
        }))
    }

    const getCurrentMonday = (value) => {
        const today = new Date(value)
        const first = today.getDate() - today.getDay() + 1;
        const monday = new Date(today.setDate(first));
        return monday;
    }

    const selectCurrentDate = (item) => {
        setCurrentDate(item.currentTarget.value);
        setOldPrevDate(new Date(item.currentTarget.value));
        let currentMonday = getCurrentMonday(item.currentTarget.value);
        let name = today.toLocaleDateString('en-us', { weekday: 'short' });
        var items = [];
        for (let index = currentMonday.getDay(); index <= 5; index++) {
            var dataItem = {
                timeZone: props.timeList,
                dayName: name,
                date: (currentMonday.getMonth() + 1) + "/" + currentMonday.getDate(),
                isPast: false
            }
            items.push(dataItem)
            currentMonday.setDate(currentMonday.getDate() + 1);
        }
        setWeekDaysArray(items)
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
            var dataItem = {
                timeZone: props.timeList,
                dayName: name,
                date: (nextDate.getMonth() + 1) + "/" + nextDate.getDate()
            }
            items.push(dataItem)
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
            var dataItem = {
                timeZone: props.timeList,
                dayName: name,
                date: (nextDate.getMonth() + 1) + "/" + nextDate.getDate()
            }
            items.push(dataItem)
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
                    <select className="time-zone" onChange={onTimeSelect} value={timezone}>
                        {
                            props.timeZones.map((item) => {
                                return <option value={item.offset}> {item.name} </option>
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

                                {
                                    item.isPast ? "Past" :
                                        renderItems(item.timeZone)}
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