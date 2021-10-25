import { Injectable } from '@angular/core';
import firebase from 'firebase/app';


interface VimeoReq {
  data: {
    body: any;
    err: any | null;
    headers: any;
    status: number;
  };
}
interface VimeoVideoSize {
  height: number;
  width: number;
  link: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  link_with_play_button: string;
}
export interface VimeoVideo {
  name: string;
  pictures: {
    active: boolean;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    default_picture: boolean;
    sizes: VimeoVideoSize[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class VimeoService {

  firebaseFunctions = firebase.app().functions('europe-west2');
  vimeoReq = this.firebaseFunctions.httpsCallable('vimeoRequest');

  constructor() {
  }

  async getVideo(id: number): Promise<VimeoVideo | Error> {
    if (!id) return new Error('Video id is not defined.');
    const reqOptions = {
      method: 'GET',
      path: `/videos/${id}`,
    };
    const { data } = (await this.vimeoReq(reqOptions) as any) as VimeoReq;
    if (data.err) return new Error(data.err);
    return data.body as VimeoVideo;
  }
}
