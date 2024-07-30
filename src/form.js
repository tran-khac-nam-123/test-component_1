import React from "react";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/fields";

export default class FormHienThi extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            items: this.props,
        };
    }

    render(){
        return(
            <form>
                <table>
                    <thead>
                        <tr>
                            <td colSpan={13} align="center"><h3>FORM HIỂN THỊ DỮ LIỆU</h3></td>
                        </tr>
                        <tr>
                            <td>Title</td>
                            <td>Lý do</td>
                            <td>Loại xin nghỉ</td>
                            <td>Thời gian</td>
                            <td>Time start</td>
                            <td>Time end</td>
                            <td>Đi muộn</td>
                            <td>Tổng ngày nghỉ</td>
                            <td>Thông báo cho</td>
                            <td>Trưởng bộ phần</td>
                            <td>Người phê duyệt</td>
                            <td>Khẩn cấp</td>
                            <td>Thực hiện</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.items.map(item => (
                            <tr key={item.Id}>
                                <td>{item.Title}</td>
                                <td>{item.lydo}</td>
                                <td>{item.loaixinnghi}</td>
                                <td>{item.thoigian}</td>
                                <td>{Date(item.timestart) ? item.timestart : null}</td>
                                <td>{Date(item.timeend) ? item.timeend : null}</td>
                                <td>{parseInt(item.dimuon)}</td>
                                <td>{parseInt(item.tongngaynghi)}</td>
                                <td>{item.thongbaocho}</td>
                                <td>{item.truongbophan}</td>
                                <td>{item.nguoipheduyet}</td>
                                <td>{item.khancap ? "Có" : "Không"}</td>
                                <td colSpan={2}>
                                    <button type="button" onClick={() => this.props.updateId(item.Id)}>Sửa</button>
                                    <button type="button" onClick={() => this.props.deleteId(item.Id)}>Xóa</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </form>
        );
    }
}