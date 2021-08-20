import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { YoutubeResponse } from '../models/youtube.models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private youtubeUrl = 'https://www.googleapis.com/youtube/v3';
  private apiKey = 'AIzaSyB7rZShgOvigo8pcgYyKxg4YB4P-QDK5nU';
  private playList = 'UUIY-0ZA-n5eY5aWx6aPjj8w';
  private nextPageToken = '';

  constructor( private http: HttpClient ) {}

   getVideos(){

    const url = `${ this.youtubeUrl }/playlistItems`;
    const params = new HttpParams()
      .set('part', 'snippet')
      .set('maxResults', '6')
      .set('playlistId', this.playList)
      .set('key', this.apiKey)
      .set('pageToken', this.nextPageToken)

    return this.http.get<YoutubeResponse>(url, { params } )
               .pipe(

                 map( resp => {
                   this.nextPageToken = resp.nextPageToken;
                   return resp.items;
                 }),
                 map( items => items.map ( video => video.snippet ))
               )

   }
}
