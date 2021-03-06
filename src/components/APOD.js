import React from 'react';

export default class PersonList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            explanation: '',
            imgurl: '',
            date: ''
        };
    }

    makeRequest(date) {
        fetch('https://api.nasa.gov/planetary/apod?api_key=meFWEj0jbBCkd4cyrYCcMADQFPwYXa2SY57zzuEn&date=' + date)
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData);
                this.setState({
                    explanation: responseData.explanation,
                    imgurl: responseData.url
                });
            });
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { date } = this.state;
        this.makeRequest(date);
        this.setState({
            date: ''
        })
    }

    render() {
        const { date } = this.state
        const divStyle = {
            display: 'flex',
            justifyContent: 'center'
        }
        const imgStyle = {
            maxWidth: '70%',
            maxHeight: '70%',
        }
        const buttonStyle = {
            backgroundColor: 'lightgrey',
            borderWidth: '2px',
            borderStyle: 'outset',
            borderImage: 'initial',
            display: 'block'
        }
        const inputStyle = {
            marginBottom: '5%'
        }
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1;
        var yyyy = today.getFullYear();
        if(dd<10){
            dd='0'+dd
        }
        if(mm<10){
            mm='0'+mm
        }

        today = yyyy+'-'+mm+'-'+dd;
        return (
            <div>
                <div>Explanation: {this.state.explanation}</div>
                <br/>
                <div style={divStyle}>
                    <img alt={''} style={imgStyle} src={this.state.imgurl} />
                </div>
                <br />
                <form onSubmit={this.onSubmit}>
                    <label htmlFor="input1" >Enter a date: </label>
                    <input style={inputStyle} id="input1" type="date" min="1995-06-20" max={today} name="date" value={date} onChange={this.onChange} />
                    <button style={buttonStyle} type="submit">Get The Picture!</button>
                </form>
            </div>
        );
    }
}