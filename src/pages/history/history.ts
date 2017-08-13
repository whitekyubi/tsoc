import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers } from '@angular/http';		//要get和post要import這行
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { ReviewPage } from '../review-page/review-page';

/**
 * Generated class for the History page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {
	public stage1 : number = 0;
	public stage2 : number = 0;
	public stage3 : number = 0;
	public stage4 : number = 0;
	public stage5 : number = 0;
	public stage6 : number = 0;
	public stage7 : number = 0;
	public stage3A : number = 0;
	public stage3B : number = 0;
	public stage3C : number = 0;
	public stage3D : number = 0;
	public stage4A : number = 0;
	public stage4B : number = 0;
	public stage4C : number = 0;
	public stage5A : number = 0;
	public stage5B : number = 0;

	public showstage1 : number ;
	public showstage2 : number ;
	public showstage3 : number ;
	public showstage4 : number ;
	public showstage5 : number ;
	public showstage6 : number ;
	public showstage7 : number ;

	public showstage3A : number = 0;
	public showstage3B : number = 0;
	public showstage3C : number = 0;
	public showstage3D : number = 0;
	public showstage4A : number = 0;
	public showstage4B : number = 0;
	public showstage4C : number = 0;
	public showstage5A : number = 0;
	public showstage5B : number = 0;



  constructor(public navCtrl: NavController, public navParams: NavParams,public http: Http,public storage: Storage) {
 this.load();

  }



  load(){
  	this.storage.get('user').then((val) => {
  
  	let data = '{"uid": "' + val.uid + '"}';
  	console.log(data);
  	this.http.post('http://140.123.175.96:8080/tsoc/gethis.php',data)
      .map(res => res.json())
      .subscribe(data =>
        {   
        	this.stage1=data.stage[0];
        	this.stage2=data.stage[1];
        	this.stage3=data.stage[2];
        	this.stage3A=data.stage[3];
        	this.stage3B=data.stage[4];
        	this.stage3C=data.stage[5];
        	this.stage3D=data.stage[6];
        	this.stage4=data.stage[7];
        	this.stage4A=data.stage[8];
        	this.stage4B=data.stage[9];
        	this.stage4C=data.stage[10];
        	this.stage5=data.stage[11];
        	this.stage5A=data.stage[12];
        	this.stage5B=data.stage[13];
        	this.stage6=data.stage[14];
        	this.stage7=data.stage[15];
        	if(this.stage1!=0){this.showstage1 = 1}
        	if(this.stage2!=0){this.showstage2 = 1}
        	if(this.stage3!=0){this.showstage3 = 1}
        	if(this.stage4!=0){this.showstage4 = 1}
        	if(this.stage5!=0){this.showstage5 = 1}
        	if(this.stage6!=0){this.showstage6 = 1}
        	if(this.stage7!=0){this.showstage7 = 1}
 			
 
        });
  });

      }
 redirect1()
	{
		console.log("hi");
		this.navCtrl.push(ReviewPage, {message:"stage1"});
	}
	 redirect2()
	{
		console.log("hi");
		this.navCtrl.push(ReviewPage, {message:"stage2"});
	}
	 show3()
	{
		this.showstage1=0;
		this.showstage2=0;
		this.showstage3=0;
		this.showstage4=0;
		this.showstage5=0;
		this.showstage6=0;
		this.showstage7=0;
		this.showstage4A=0;
		this.showstage4B=0;
		this.showstage4C=0;
		this.showstage5A=0;
		this.showstage5B=0;


		if(this.stage3A !=0)
		{this.showstage3A  = 1;}
		if(this.stage3B !=0)
		{this.showstage3B  = 1;}
		if(this.stage3C !=0)
		{this.showstage3C  = 1;}
		if(this.stage3D !=0)
		{this.showstage3D  = 1;}

		
	}

	redirect3A(){this.navCtrl.push(ReviewPage, {message:"stage3A"});}
	redirect3B(){this.navCtrl.push(ReviewPage, {message:"stage3B"});}
	redirect3C(){this.navCtrl.push(ReviewPage, {message:"stage3C"});}
	redirect3D(){this.navCtrl.push(ReviewPage, {message:"stage3D"});}


	show4(){
		this.showstage1=0;
		this.showstage2=0;
		this.showstage3=0;
		this.showstage4=0;
		this.showstage5=0;
		this.showstage6=0;
		this.showstage7=0;
		this.showstage4A=0;
		this.showstage4B=0;
		this.showstage4C=0;
		this.showstage5A=0;
		this.showstage5B=0;

		if(this.stage4A !=0)
		{this.showstage4A  = 1;}
		if(this.stage4B !=0)
		{this.showstage4B  = 1;}
		if(this.stage4C !=0)
		{this.showstage4C  = 1;}


	}

	redirect4A(){this.navCtrl.push(ReviewPage, {message:"stage4A"});}
	redirect4B(){this.navCtrl.push(ReviewPage, {message:"stage4B"});}
	redirect4C(){this.navCtrl.push(ReviewPage, {message:"stage4C"});}

	show5(){
		this.showstage1=0;
		this.showstage2=0;
		this.showstage3=0;
		this.showstage4=0;
		this.showstage5=0;
		this.showstage6=0;
		this.showstage7=0;
		this.showstage4A=0;
		this.showstage4B=0;
		this.showstage4C=0;
		this.showstage5A=0;
		this.showstage5B=0;

		if(this.stage5A !=0)
		{this.showstage5A  = 1;}
		if(this.stage5B !=0)
		{this.showstage5B  = 1;}

	}

	redirect5A(){this.navCtrl.push(ReviewPage, {message:"stage5A"});}
	redirect5B(){this.navCtrl.push(ReviewPage, {message:"stage5B"});}


	redirect6(){this.navCtrl.push(ReviewPage, {message:"stage6"});}
	redirect7(){this.navCtrl.push(ReviewPage, {message:"stage7"});}
	back()
	{
        if(this.stage1!=0){this.showstage1 = 1}
        if(this.stage2!=0){this.showstage2 = 1}
        if(this.stage3!=0){this.showstage3 = 1}
        if(this.stage4!=0){this.showstage4 = 1}
        if(this.stage5!=0){this.showstage5 = 1}
        if(this.stage6!=0){this.showstage6 = 1}
        if(this.stage7!=0){this.showstage7 = 1}

		this.showstage4A=0;
		this.showstage4B=0;
		this.showstage4C=0;
		this.showstage3A=0;
		this.showstage3B=0;
		this.showstage3C=0;
		this.showstage3D=0;
		this.showstage5A=0;
		this.showstage5B=0;
	}

}
