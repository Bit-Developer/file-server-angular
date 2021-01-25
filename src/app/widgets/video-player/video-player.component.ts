import { Component, OnInit, OnDestroy, Input, Output, ElementRef, EventEmitter, ViewChild } from '@angular/core';
import Player from 'xgplayer';
import { IPlayerOptions } from 'xgplayer';

@Component({
  selector: 'widget-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
})
export class VideoPlayerComponent implements OnDestroy {
  @ViewChild('xgplayerElem') playerElemRef: ElementRef;
  private player: Player;
  private inputOptions: IPlayerOptions;

  @Input() set options(value: IPlayerOptions) {
    this.inputOptions = value;
  }

  /*  
  @Input() set plugins(value: { name: string; handler: Function }[]) {
      value.forEach((plugin: { name: string; handler: Function }) => {
        //Player.install(plugin.name, plugin);
      });
    }
  
  @Output() playerReady = new EventEmitter<any>();
  @Output() startplay = new EventEmitter<any>();
  @Output() playing = new EventEmitter<any>();
  @Output() paused = new EventEmitter<any>();
  @Output() ended = new EventEmitter<any>();
  @Output() error = new EventEmitter<any>();
  @Output() seeking = new EventEmitter<any>();
  @Output() seeked = new EventEmitter<any>();
  @Output() timeupdate = new EventEmitter<any>();
  @Output() waiting = new EventEmitter<any>();
  @Output() canplay = new EventEmitter<any>();
  @Output() canplaythrough = new EventEmitter<any>();
  @Output() durationchange = new EventEmitter<any>();
  @Output() volumechange = new EventEmitter<any>();
  @Output() complete = new EventEmitter<any>();
  @Output() destroy = new EventEmitter<any>(); */

  ngOnDestroy() {
    this.player.destroy();
  }

  ngAfterViewInit() {
    const playerElement = this.playerElemRef.nativeElement as HTMLElement;
    let defaultOptions: IPlayerOptions = {
      el: playerElement,
      url: '',
      fluid: true,
      videoInit: true,
      playbackRate: [0.5, 0.75, 1, 1.5, 2],
      defaultPlaybackRate: 1,
      cssFullscreen: true,
      keyShortcut: 'on',
      airplay: true,
      lang: 'en',
    };
    defaultOptions = Object.assign(defaultOptions, this.inputOptions);
    this.player = new Player(defaultOptions);
    //this.initEvents();
  }
  /* 

  initEvents() {
    this.player.once('ready', () => {
      console.log('ready');
      this.playerReady.emit(this);
    });
    this.player.once('complete', () => {
      console.log('complete');
      this.complete.emit(this);
    });
    this.player.on('play', (evt: Event) => {
      console.log('play');
      console.log(evt);
      this.startplay.emit(evt);
    });
    this.player.on('playing', (evt: Event) => {
      console.log('playing');
      console.log(evt);
      this.playing.emit(evt);
    });
    this.player.on('pause', (evt: Event) => {
      console.log('pause');
      console.log(evt);
      this.paused.emit(evt);
    });
    this.player.on('ended', (evt: Event) => {
      console.log('ended');
      console.log(evt);
      this.ended.emit(evt);
    });
    this.player.on('error', (evt: any) => {
      console.log('error');
      console.log(evt);
      this.error.emit(evt);
    });
    this.player.on('seeking', (evt: any) => {
      console.log('seeking');
      console.log(evt);
      this.seeking.emit(evt);
    });
    this.player.on('seeked', (evt: any) => {
      console.log('seeked');
      console.log(evt);
      this.seeked.emit(evt);
    });
    this.player.on('timeupdate', (evt: any) => {
      console.log('timeupdate');
      console.log(evt);
      this.timeupdate.emit(evt);
    });
    this.player.on('waiting', (evt: any) => {
      console.log('waiting');
      console.log(evt);
      this.waiting.emit(evt);
    });
    this.player.on('canplay', (evt: any) => {
      console.log('canplay');
      this.canplay.emit(evt);
    });
    this.player.on('canplaythrough', (evt: any) => {
      console.log('canplaythrough');
      console.log(evt);
      this.canplaythrough.emit(evt);
    });
    this.player.on('durationchange', (evt: any) => {
      console.log('durationchange');
      console.log(evt);
      this.durationchange.emit(evt);
    });
    this.player.on('volumechange', (evt: any) => {
      console.log('volumechange');
      console.log(evt);
      this.volumechange.emit(evt);
    });
    this.player.once('volumechange', () => {
      console.log('volumechange');
      this.destroy.emit();
    });
  }
*/
  start(url: string) {
    this.player.start(url);
  }

  play() {
    this.player.play();
  }

  replay() {
    this.player.replay();
  }

  pause() {
    this.player.pause();
  }

  reload() {
    this.player.reload();
  }

  setVolume(volume: number) {
    // 0.1 ~ 1
    this.player.volume = volume;
  }

  getDuration(): number {
    return this.player.duration;
  }

  setCurrentTime(time: number) {
    this.player.currentTime = time;
  }

  canPlayType(mimeType: string): string {
    return this.player.canPlayType(mimeType);
  }

  getBufferedRange(): any {
    return this.player.getBufferedRange();
  }
}
