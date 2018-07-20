import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { CommonService } from '../../providers/index';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-listingproperty',
  templateUrl: './listingpropertytype.component.html',
  styleUrls: ['./listingpropertytype.component.css']
})
export class ListingpropertytypeComponent implements OnInit , OnDestroy{
  tableData: any[];
  display:boolean = false;
  userform: FormGroup;
  dataList: any = {};
  imagePreview: any;
  selectRow: any;
 sub:any;
 routeApi: string;
 title: string;
  constructor(
    private fb: FormBuilder,
    private commonServices: CommonService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.data.subscribe(v => {
      this.routeApi = v.routeApi;
      this.title = v.title;
    });
    
    this.commonServices.getAll(this.routeApi).subscribe((res) => {
      console.log(res.roomTypes , typeof(res.roomTypes))
      this.tableData = res.roomTypes;
    });
   
    }
  
    ngOnDestroy() {
      this.sub.unsubscribe();
    }
  
  onBasicUpload(ev) {
    this.imagePreview = ev.files[0].objectURL.changingThisBreaksApplicationSecurity;
    const uploadedImg = JSON.parse(ev.xhr.response).file[0];
    this.dataList.sliderImage = uploadedImg;
  }
  showDialog(data) {
    if (data) {
      this.dataList = data;
    } else {
      this.dataList = {};
    }
    this.display = true;
  }
  onSubmit({ value }) {
    const data = this.dataList;
    this.display = false;
    if (data._id) {
      this.updateSlider(data);
    } else {
      this.addSlider(data);
    }
  }
  updateSlider(val) {
    this.commonServices.update(this.routeApi, val).subscribe(res => {
      console.log(res);
    });
  }
  addSlider(val) {
    this.commonServices.create(this.routeApi, val).subscribe(res => {
      this.tableData = [...this.tableData , JSON.parse(res['_body']).roomType];
    });
  }
  onDeleteSlider(val) {
    console.log(val);
    this.commonServices.delete(this.routeApi + '/' + val._id).subscribe(res => {
      const index = this.findSelectedRowIndex();
      this.tableData = this.tableData.filter((data, i) => i !== index);
    });
  }
  findSelectedRowIndex(): number {
    return this.tableData.indexOf(this.selectRow);
  }
}
  