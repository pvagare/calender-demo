const initialState = {
    timeList: [
        "08:00AM",
        "08:30AM",
        "09:00AM",
        "09:30AM",
        "10:00AM",
        "10:30AM",
        "11:00AM",
        "11:30AM",
        "12:00PM",
        "12:30PM",
        "01:00PM",
        "01:30PM",
        "02:00PM",
        "02:30PM",
        "03:00PM",
        "03:30PM",
        "04:00PM",
        "04:30PM",
        "05:00PM",
        "07:00PM",
        "07:30PM",
        "08:00PM",
        "08:30PM",
        "09:00PM",
        "09:30PM",
        "10:00PM",
        "10:30PM",
        "11:00PM"
    ],
    days: [
        "Mon/02",
        "Tue/03",
        "Wed/04",
        "Thu/05",
        "Fri/06"
    ],

    timeZones: [
        {
            name: "(UTC+00:00) Coordinated Universal Time",
            value: 'Europe/London'
        },
        {
            name: "(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi",
            value: 'Asia/Kolkata'
        }
    ]
}

export default initialState;
