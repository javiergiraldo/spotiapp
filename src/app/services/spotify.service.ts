import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class SpotifyService {

    constructor(private http: HttpClient) {
        console.log('Spotify servicio listo');
    }

    getQuery(query: string) {
        const url = `https://api.spotify.com/v1/${query}`;

        const headers = new HttpHeaders({
            'Authorization': 'Bearer BQBxr80ZWNB6k6NZ6vXQekP7Q97izkOnaVn4obb4Ns2bihUF3vqQ6VFfF7i3l3fOcjzJm4WQKk8bFFZuB90'
        });

        return this.http.get(url, { headers });

    }


    getNewReleases() {

        return this.getQuery('browse/new-releases?limit=20')
            .pipe(map(data => data['albums'].items)); //en esta línea quito llaves y return

    }

    getArtistas(termino: string) {

        return this.getQuery(`search?q=${termino}&type=artist&limit=15`)
            .pipe(map(data => data['artists'].items));
    }

    getArtista(id: string) {

        return this.getQuery(`artists/${id}`)
        //.pipe(map(data => data['artists'].items));
    }

    getTopTracks(id: string) {

        return this.getQuery(`artists/${id}/top-tracks?country=us`)
            .pipe(map(data => data['tracks']));
    }

}
