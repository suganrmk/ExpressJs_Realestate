import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { CommonService } from '../../providers/index';
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  sliderData: any[];
  display: boolean = false;
  userform: FormGroup;
  sliders: any = {};
  imagePreview: any;
  selectedRow: any;

  constructor(private fb: FormBuilder, private commonServices: CommonService) { }

  ngOnInit() {
    this.commonServices.getAll('/route/slider').subscribe((res) => {
      this.sliderData = res.homesliders;
    });
  }
  
  onBasicUpload(ev) {
    const uploadedImg = JSON.parse(ev.xhr.response).file[0];
    this.sliders.sliderImage = uploadedImg;
  }
  showDialog(data) {
    if (data) {
      this.sliders = data;
    } else {
      this.sliders = {};
    }
    this.display = true;
  }
  onSubmitSlider({ value }) {
    const data = this.sliders;
    this.display = false;
    if (data._id) {
      this.updateSlider(data);
    } else {
      this.addSlider(data);
    }
  }
  updateSlider(val) {
    this.commonServices.update('/route/slider', val).subscribe(res => {
      console.log(res);
    });
  }
  addSlider(val) {
    this.commonServices.create('/route/slider', val).subscribe(res => {
      this.sliderData = [...this.sliderData, JSON.parse(res['_body']).homesliders];
    });
  }
  onDeleteSlider(val) {
    this.commonServices.delete('/route/slider/' + val._id).subscribe(res => {
      const index = this.findSelectedRowIndex();
      this.sliderData = this.sliderData.filter((data, i) => i !== index);
    });
  }
  findSelectedRowIndex(): number {
    return this.sliderData.indexOf(this.selectedRow);
  }
}
