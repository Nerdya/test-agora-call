import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import AgoraRTC, { IAgoraRTCClient } from 'agora-rtc-sdk-ng';
import { CallService } from '../../../services/call.service';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.scss']
})
export class AgentComponent implements OnInit, OnDestroy {
  needLogin = false;
  user = {
    "userName": "admin",
    "password": "t1MPggD49pQkboYrWYmkd1umlJe155QfRhPkQFYgkq59NVsXdPPdARhIzqjJdOeNsUYzDbd2bEsUdMT3ZPJzFeNJovbK3GwYmOenfZoZ/sBPypY2FYGrquV7BauMVaaGjZJLkoFxySylAc7rLVyJjCVg5AoQdzEc6+2XBNBM2dw="
  };
  authUrl = '';
  authToken = '';
  url = '';
  appId = '';
  channel = '';
  token = '';
  uid = '';
  options: any;
  message = '';
  joined = false;

  // Agora
  // client: IAgoraRTCClient = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
  client: any;
  localAudioTrack: any;
  localVideoTrack: any;
  remoteAudioTrack: any;
  remoteVideoTrack: any;
  // rtc = {
  //   // For the local client.
  //   client: null,
  //   // For the local audio and video tracks.
  //   localAudioTrack: null,
  //   localVideoTrack: null,
  // };

  constructor(
    private callService: CallService
  ) {}

  ngOnInit() {
    
  }

  ngOnDestroy() {
    if (this.joined) {
      this.leaveCall();
    }
  }

  getCallInfo() {
    if (this.needLogin) {
      this.getToken();
    } else {
      this.getCallOptions(false);
    }
  }

  getToken() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    let options = {
      headers: headers,
    }
    this.callService.login(this.url, this.user, options).subscribe(res => {
      if (res && res.status) {
        this.authToken = res?.data.token;
        this.getCallOptions(true);
      }
    });
  }

  getCallOptions(needLogin: any) {
    let headers = new HttpHeaders();
    if (needLogin) {
      headers = headers.set('token', this.authToken);
    }
    headers = headers.set('Access-Control-Allow-Origin', '*');
    let params = new HttpParams();
    params = params.set('sessionKey', localStorage.getItem('sessionKey')!);
    let options = {
      headers: headers,
      params: params
    }
    this.callService.calljoin(this.url, options).subscribe(res => {
      // let data = {
      //   sessionId: "8eb2a44d9fe6a8841ba046eb86e9a82a799a2ba26feabaf73f78da3605628718",
      //   sessionKey: "8eb2a44d9fe6a8841ba046eb86e9a82a799a2ba26feabaf73f78da3605628718",
      //   code: "006b2d320ca642f48958f2b5e5cd1b1c547IAASVUdwQRRbri2xMK+eX+clNt9Taf0T63KQsj57D4ilvtK8c3ojKr4eCgD03x+CmbKEYgAA",
      //   webcamToken: null,
      //   screenToken: null,
      //   subId: "777241873"
      // }
      if (res && res.status) {
        this.appId = res?.data.sessionId;
        this.channel = res?.data.sessionKey;
        this.token = res?.data.code;
        this.uid = res?.data.subId;
        this.initCall();
      }
    });
  }

  initCall() {
    this.options = {
      // Pass your app ID here.
      appId: this.appId,
      // Set the channel name.
      channel: this.channel,
      // Pass a token if your project enables the App Certificate.
      token: this.token,
      // User id
      uid: Number(this.uid),
    };
    this.startBasicCall();
  }
  
  async startBasicCall() {
    console.log('startBasicCall');
    // 1. Create client
    this.client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
    this.message = 'create client success!';

    // 4. Subscribe to remote user
    this.client.on("user-published", async (user: any, mediaType: any) => {
      // Subscribe to a remote user.
      await this.client.subscribe(user, mediaType);
      this.message = 'subscribe success!';
    
      // If the subscribed track is video.
      if (mediaType === "video") {
        // Get `RemoteVideoTrack` in the `user` object.
        this.remoteVideoTrack = user.videoTrack;
        // Dynamically create a container in the form of a DIV element for playing the remote video track.
        const playerContainer = document.createElement("div");
        // Specify the ID of the DIV container. You can use the `uid` of the remote user.
        playerContainer.id = user.uid.toString();
        playerContainer.style.width = "640px";
        playerContainer.style.height = "480px";
        document.body.append(playerContainer);
    
        // Play the remote video track.
        // Pass the DIV container and the SDK dynamically creates a player in the container for playing the remote video track.
        // remoteVideoTrack.play(playerContainer);

        // Or just pass the ID of the DIV container.
        this.remoteVideoTrack.play(playerContainer.id);
      }
    
      // If the subscribed track is audio.
      if (mediaType === "audio") {
        // Get `RemoteAudioTrack` in the `user` object.
        this.remoteAudioTrack = user.audioTrack;
        // Play the audio track. No need to pass any DOM element.
        this.remoteAudioTrack.play();
      }
    });

    this.client.on("user-unpublished", (user: any) => {
      // Get the dynamically created DIV container.
      const playerContainer = document.getElementById(user.uid.toString());
      // Destroy the container.
      // @ts-ignore
      playerContainer.remove();
    });
  }

  async joinCall() {
    // 2. Join
    this.uid = await this.client.join(this.options.appId, this.options.channel, this.options.token, this.options.uid);

    // 3. Create and publish local tracks
    // Create an audio track from the audio sampled by a microphone.
    this.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    // Create a video track from the video captured by a camera.
    this.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
    // Publish the local audio and video tracks to the channel.
    await this.client.publish([this.localAudioTrack, this.localVideoTrack]);

    this.localVideoTrack.play('local');

    this.message = 'join success!';
    this.joined = true;
  }

  // 5. Leave the channel
  async leaveCall() {
    // Destroy the local audio and video tracks.
    this.localAudioTrack.close();
    this.localVideoTrack.close();
  
    // Traverse all remote users.
    // @ts-ignore
    this.client.remoteUsers.forEach(user => {
      // Destroy the dynamically created DIV container.
      const playerContainer = document.getElementById(user.uid.toString());
      playerContainer && playerContainer.remove();
    });
  
    // Leave the channel.
    await this.client.leave();

    this.message = 'leave success!';
    this.joined = false;
  }

  async checkAudioOutput() {
    AgoraRTC.getDevices().then((devices: any) => {
      let outputs = devices.filter((device: any) => device.kind.includes('output'));
      console.log(outputs);
      alert(JSON.stringify(outputs));
    });
  }
  
  async checkCameras() {
    AgoraRTC.getCameras().then((cameras: any) => {
      console.log(cameras);
      alert(JSON.stringify(cameras));
    })
  }

}

