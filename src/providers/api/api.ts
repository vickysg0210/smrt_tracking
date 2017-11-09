import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {
  private service: {
    endpoint: string,
    apis: Array<{
      name: string,
      method: string,
      secret: string,
      link: string
    }>
  }

  constructor(public http: Http) {
    this.service = {
      endpoint: "http://via.viatick.com/smrt_track_tracking",
      apis: [{
        name: "SyncDevice",
        method: "POST",
        secret: "00register00",
        link: "/service/asset/register"
      }, {
        name: "BeaconRegion",
        method: "GET",
        secret: "00tracking00",
        link: "/service/bms"
      }, {
        name: "BeaconRecord",
        method: "POST",
        secret: "00tracking00",
        link: "/service/bms"
      }, {
        name: "DeviceToken",
        method: "PUT",
        secret: "00notification00",
        link: "/service/asset/register"
      }, {
        name: "SendMessage",
        method: "POST",
        secret: "00notification00",
        link: "/service/asset/message"
      }]
    };
  }

  private sendRequest = function(name: string, id: number, operation: string, input: object, success: any, fail: any) {
    // prepare requested API
    var method: string = null;
    var url: String = null;
    var headers: {
      "Content-Type": string,
      "Auth-Secret": string
    } = null;
    for(var o in this.service.apis) {
      var api = this.service.apis[o];
      if(api.name == name) {
        method = api.method;
        url = this.service.endpoint + api.link;
        headers = {
          "Content-Type": "application/json",
          "Auth-Secret": api.secret
        };
        break;
      }
    }
    // console.log(method, url, headers, id, input, operation);
    if(id != -1) {
      url = url + "/" + id;
    }
    if(operation != null) {
      url = url + "/" + operation;
    }
    // send request
    switch(method) {
      case "GET":
        this.getRequest(url, input, headers, success, fail);
      break;
      case "POST":
        this.postRequest(url, input, headers, success, fail);
      break;
      case "PUT":
        this.putRequest(url, input, headers, success, fail);
      break;
      case "DELETE":
        this.deleteRequest(url, headers, success, fail);
      break;
      default:
        console.log("the method not found!");
    }
  };

  private getRequest = function(url: string, input: object, headers: {
    "Content-Type": string,
    "Auth-Secret": string
  }, success: any, fail: any) {
    let additionalUrl = "";
    if(input) {
      let keys = Object.keys(input);
      for(var o in keys) {
        let key = keys[o];
        additionalUrl += "&" + encodeURIComponent(key) + "=" + encodeURIComponent(input[key]);
      }
    }
    this.http.get(url + "?_=" + new Date().getTime() + additionalUrl, {
      headers: headers
    }).subscribe((res: Response) => {
      if(success) {
        success(JSON.parse(res.text()));
      }
    }, (err: Response) => {
      if(fail) {
        fail(JSON.parse(err.text()));
      }
    });
  };

  private postRequest = function(url: string, input: object, headers: {
    "Content-Type": string,
    "Auth-Secret": string
  }, success: any, fail: any) {
    this.http.post(url, input, {
      headers: headers
    }).subscribe((res: Response) => {
      if(success) {
        success(JSON.parse(res.text()));
      }
    }, (err: Response) => {
      if(fail) {
        fail(JSON.parse(err.text()));
      }
    });
  };

  private putRequest = function(url: string, input: object, headers: {
    "Content-Type": string,
    "Auth-Secret": string
  }, success: any, fail: any) {
    this.http.put(url, input, {
      headers: headers
    }).subscribe((res: Response) => {
      if(success) {
        success(JSON.parse(res.text()));
      }
    }, (err: Response) => {
      if(fail) {
        fail(JSON.parse(err.text()));
      }
    });
  };

  private deleteRequest = function(url: string, headers: {
    "Content-Type": string,
    "Auth-Secret": string
  }, success: any, fail: any) {
    this.http.delete(url, {
      headers: headers
    }).subscribe((res: Response) => {
      if(success) {
        success(JSON.parse(res.text()));
      }
    }, (err: Response) => {
      if(fail) {
        fail(JSON.parse(err.text()));
      }
    });
  };

}
