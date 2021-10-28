/* eslint-disable radix */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { FirestoreExtendedService } from 'src/app/shared/services/firestore-extended.service';
import { VimeoService, VimeoVideo } from './vimeo.service';


export interface AdminVideo {
  id?: string;
  title?: string;
  link?: string;
  status: 'private' | 'public';
  source?: 'YouTube' | 'Vimeo';
  videoId?: number | string;
  thumbnail?: string;
  createdAt?: any;
  updatedAt?: any;
}

@Injectable({
	providedIn: 'root'
})
export class AdminVideoService {

	constructor(
    private db: FirestoreExtendedService,
    private vimeoService: VimeoService,
    private http: HttpClient
	) { }

	async upsert(video: AdminVideo): Promise<void> {
		const linkErr = 'Le informazioni inserite non sono corrette. Controllare di aver inserito un link valido.';
		if (!video || !video.link) throw new Error(linkErr);
		const id = video.id ? video.id : null;
		const source = this.getSource(video.link);
		if (!source || !source.source || !source.videoId) throw new Error(linkErr);
		video.source = source.source;
		video.videoId = source.videoId;
		if (source.source === 'YouTube')
			video.thumbnail = `https://img.youtube.com/vi/${video.videoId}/0.jpg`;
		try {
			if (source.source === 'YouTube')
				video.title = await this.getYtTitle(video.videoId);
			else if (source.source === 'Vimeo')
				video = await this.setVimeoInfo(video);
			await this.db.upsert(`videos/${id}`, video);
			return;
		} catch (error) {
			throw new Error(linkErr);
		}
	}

	getAll(orderByRecent?: boolean): Observable<AdminVideo[]> {
		if (!orderByRecent)
			return this.db.col$<AdminVideo>('videos');
		else
			return this.db.col$<AdminVideo>('videos', (ref: any) => ref.orderBy('updatedAt', 'desc'));
	}

	delete(id: string): Promise<any> {
		return this.db.delete(`videos/${id}`);
	}

	private getSource(link: string): { source: 'YouTube' | 'Vimeo'; videoId: number | string } | null {
		const ytRegEx = /(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/;
		const matchYT = link.match(ytRegEx);
		const matchVimeo = link.includes('vimeo') && link.split('/')[3];
		let res: { source: 'YouTube' | 'Vimeo'; videoId: number | string } | null = null;

		if (matchYT && matchYT[1]) {
			res = { source: 'YouTube', videoId: matchYT[1] };
		} else if (matchVimeo && parseInt(matchVimeo)) {
			res = { source: 'Vimeo', videoId: parseInt(matchVimeo) };
		}

		return res;
	}

	private async getYtTitle(videoId: number | string): Promise<string> {
		const ytApiKey = 'AIzaSyAJnMQGGX7iDQLI8QS5RTvn0nyhGLDfmhA';
		// eslint-disable-next-line max-len
		const req = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${ytApiKey}&fields=items(id,snippet(channelId,title,categoryId),statistics)&part=snippet,statistics`;
		const video = await this.http.get(req).pipe(take(1)).toPromise() as any;
		if (!video || video.items.length <= 0 || !video.items[0].snippet.title) throw new Error('');
		return video.items[0].snippet.title as string;
	}

	private async setVimeoInfo(video: AdminVideo): Promise<AdminVideo> {
		const vimeoId = video.link?.split('/')[3];
		if (!vimeoId) return video;
		const vimeo = await this.vimeoService.getVideo(parseInt(vimeoId));
		if (vimeo instanceof Error || !vimeo) throw vimeo;
		const vimeoThumbs = (vimeo as VimeoVideo).pictures.sizes
			.filter(size => size.width >= 640 && size.width <= 1280);
		if (!video) return video;
		video.thumbnail = vimeoThumbs[0].link;
		video.title = vimeo.name;
		return video;
	}
}
