import "./App.css";
import React from "react";
import workflowService from "./workflowService";
import "@pnp/sp/webs";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/fields";
import FormHienThi from "./form";

export default class App extends React.Component {

  constructor(){
    super();
    this.state = {
      Title: '',
      lydo: '',
      loaixinnghi: '',
      thoigian: '',
      timestart: '',
      timeend: '',
      dimuon: '',
      tongngaynghi: '',
      thongbaocho: '',
      truongbophan: '',
      nguoipheduyet: '',
      khancap: false,
      items: [],
      selectedId: null,
    };
  }

  async componentDidMount(){
    await this.handleDisplay();
  }

  async handleAdd(){
    const listName = 'form-xin-nghi';
    const item = {
        Title: this.state.Title,
        lydo: this.state.lydo ? this.state.lydo : '',
        loaixinnghi: this.state.loaixinnghi ? this.state.loaixinnghi : '',
        thoigian: this.state.thoigian ? this.state.thoigian : '',
        timestart: this.state.timestart ? new Date(this.state.timestart) : null,
        timeend: this.state.timeend ? new Date(this.state.timeend) : null,
        dimuon: parseInt(this.state.dimuon) ? this.state.dimuon : 0,
        tongngaynghi: parseInt(this.state.tongngaynghi) ? this.state.tongngaynghi : 0,
        thongbaocho: this.state.thongbaocho ? this.state.thongbaocho : '',
        truongbophan: this.state.truongbophan ? this.state.truongbophan : '',
        nguoipheduyet: this.state.truongbophan ? this.state.truongbophan : '',
        khancap: this.state.khancap
    };

    await workflowService.addItemToList(listName, item);
    
  }

  async handleDisplay(){
    var items = await workflowService.getItemToList("form-xin-nghi");
    this.setState({items: items});
  }

  handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    this.setState({
      [name]: type === 'checkbox' ? checked : value
    });
  }

  async handleUpdate() {
    const { selectedId, ...item } = this.state;
    let obj={
      Title: item.Title,
      lydo: item.lydo,
      loaixinnghi: item.loaixinnghi,
      thoigian: item.thoigian,
      timestart: item.timeend,
      timeend: item.timeend,
      dimuon: item.dimuon,
      tongngaynghi: item.tongngaynghi,
      thongbaocho: item.thongbaocho,
      truongbophan: item.truongbophan,
      nguoipheduyet: item.truongbophan,
      khancap: item.khancap,
    }
    await workflowService.updateItemToList("form-xin-nghi", selectedId, obj);

  }

  async handleDelete() {
    const { selectedId } = this.state;
    await workflowService.deleteItemToList("form-xin-nghi", selectedId);
  }

  updateId = (id) => {
    const selectedItem = this.state.items.find(item => item.Id === id);
    this.setState({
      ...selectedItem,
      selectedId: id
    });
  }

  deleteId = (id) => {
    if(window.confirm("Bạn có chắc chắn muốn xóa không?")){
      workflowService.deleteItemToList("form-xin-nghi", id);
    }
  }

  render(){
    return (
      <div className="app">
        <div className="app-header">
          <h3>XIN NGHỈ PHÉP</h3>
          <a href="#1" className="quytrinh">Quy trình / Xin nghỉ phép</a>
        </div>
        
        <div className="app-content">
          <form className="app-form" method="post">
            <table>
              <thead>
                  <tr>
                    <td>
                      <h3>Thông tin chung</h3>
                    </td>
                  </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Tiêu đề*</td>
                  <td>Lý do*</td>
                </tr>
                <tr>
                  <td><input type="text" name="Title" value={this.state.Title} onChange={this.handleChange} className="txtTieuDe"/></td>
                  <td><textarea className='txtLyDo1' name="lydo" value={this.state.lydo} onChange={this.handleChange}></textarea></td>
                </tr>
                <tr>
                  <td>Loại xin nghỉ*</td>
                  <td>Thời gian*</td>
                </tr>
                <tr>
                  <td>
                    <select className="LoaiXinNghi" name="loaixinnghi" value={this.state.loaixinnghi} onChange={this.handleChange}>
                      <option>--Lựa chọn--</option>
                      <option>Nghỉ không lương</option>
                      <option>Nghỉ phép năm</option>
                      <option>Nghỉ du lịch công ty</option>
                    </select>
                  </td>
                  <td>
                    <select className="ThoiGian" name="thoigian" value={this.state.thoigian} onChange={this.handleChange}>
                      <option>--Lựa chọn--</option>
                      <option>Cả ngày</option>
                      <option>Buổi sáng</option>
                      <option>Buổi chiều</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>Thời gian bắt đầu*</td>
                  <td>Thời gian kết thúc*</td>
                </tr>
                <tr>
                  <td><input type="datetime" className='TimeStart' name="timestart" value={this.state.timestart} onChange={this.handleChange}/></td>
                  <td><input type="datetime" className='TimeEnd' name="timeend" value={this.state.timeend} onChange={this.handleChange}/></td>
                </tr>
                <tr>
                  <td>Thời gian xin đi muộn/về sớm</td>
                  <td>Tổng ngày nghỉ</td>
                </tr>
                <tr>
                  <td><input type='text' className='txtDiMuon' name="dimuon" value={this.state.dimuon} onChange={this.handleChange}/></td>
                  <td><input type='text' className='txtTongNgayNghi' name="tongngaynghi" value={this.state.tongngaynghi} onChange={this.handleChange}/></td>
                </tr>
                <tr>
                  <td>Thông báo cho</td>
                  <td>Trưởng bộ phận</td>
                </tr>
                <tr>
                  <td><input type='text' className='txtThongBaoCho' placeholder='Tìm kiếm người dùng' name="thongbaocho" value={this.state.thongbaocho} onChange={this.handleChange}/></td>
                  <td><input type='text' className='txtTruongBoPhan' placeholder='Tìm kiếm người dùng' name="truongbophan" value={this.state.truongbophan} onChange={this.handleChange}/></td>
                </tr>
              </tbody>
            </table>
          </form>
  
          <div className='add-file'>
            <p>Tài liệu đính kèm</p>
            <div>
              <button type=''><i className="fa-solid fa-paperclip"></i> Add File</button>
            </div>
          </div>
  
          <form className='app-form'>
            <table>
              <thead>
                <tr>
                  <td>Lý do</td>
                  <td><textarea className='txtLyDo2' name="lydo" value={this.state.lydo} onChange={this.handleChange}/></td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Người phê duyệt</td>
                  <td><input type='text' className='txtNguoiPheDuyet' placeholder='Tìm kiếm người dùng' name="truongbophan" value={this.state.truongbophan} onChange={this.handleChange} /></td>
                </tr>
                <tr>
                  <td>Trạng thái khẩn cấp</td>
                  <td><input type='checkbox' className='checkbox' name="khancap" checked={this.state.khancap} onChange={this.handleChange}/></td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <button type="button" className='save' onClick={()=>this.handleDisplay()}><i className="fa-solid fa-eye"></i> Hiển thị</button>
                    <button type="button" className='save' onClick={()=>this.handleAdd()}><i className="fa-solid fa-plus"></i> Thêm</button>
                    <button type="button" className='send' onClick={()=>this.handleUpdate()}><i className="fa-solid fa-pen-to-square"></i> Sửa</button>
                    <button type="button" className='reset' onClick={()=>this.handleDelete()}><i className="fa-solid fa-trash"></i> Xóa</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
          <FormHienThi items = {this.state.items} updateId = {this.updateId} deleteId = {this.deleteId}/>
        </div>
      </div>
    );
  } 

}



