import React from 'react'
import { post } from 'axios';

let today = new Date();   

let year = today.getFullYear(); // 년도
let month = today.getMonth() + 1;  // 월
let date = today.getDate();  // 날짜
let day = today.getDay();  // 요일


class CustomerAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            userName: '',
            content: '',
            date: '',
            expire: '',
            fileName: ''
}
this.handleFormSubmit = this.handleFormSubmit.bind(this)
this.handleFileChange = this.handleFileChange.bind(this)
this.handleValueChange = this.handleValueChange.bind(this)
this.addCustomer = this.addCustomer.bind(this)
}

handleFormSubmit(e) {
    e.preventDefault()
    this.addCustomer()
        .then((response) => {
            console.log(response.data);
            this.props.stateRefresh();
        })
    this.setState({
        file: null,
        userName:'',
        content:'',
        date:'',
        expire:'',
        fileName:''
    })
}

handleFileChange(e) {
this.setState({
file: e.target.files[0],
fileName: e.target.value
});
}


handleValueChange(e) {
let nextState = {};
nextState[e.target.name] = e.target.value;
this.setState(nextState);
}

addCustomer(){
const url = '/api/customers';
const formData = new FormData();
formData.append('image', this.state.file)
formData.append('name', this.state.userName)
formData.append('content', this.state.content)
formData.append('date', year + '/' + month + '/' + date)
formData.append('expire', today.getFullYear()+3 + '/' + month + '/' + date)
const config = {
headers: {
'content-type': 'multipart/form-data'
    }
}
return post(url, formData, config)
}



render() {
return (
<form onSubmit={this.handleFormSubmit}>
    <h1>인증서 추가</h1>
        기관 인증서: <input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange} /><br/>
        인증 기관명: <input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange} /><br/>
        인증 내용: <input type="text" name="content" value={this.state.content} onChange={this.handleValueChange} /><br/>
        등록 일자: <input type="text" name="date" value={year + '/' + month + '/' + date} onChange={this.handleValueChange} /><br/>
        만료 일자: <input type="text" name="expire" value={today.getFullYear()+3 + '/' + month + '/' + date} onChange={this.handleValueChange} /><br/>
    <button type="submit">추가하기</button>
</form>
    )
}
}

export default CustomerAdd