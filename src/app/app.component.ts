import { Component } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [HttpClientModule, FormsModule],  // Required for API & ngModel
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = "GeeksforGeeks's Movie Center";
    searchTerm: string = '';
    movies: any[] = [];

    private API_URL = 'https://omdbapi.com?apikey=fe2f6c44';

    constructor(private http: HttpClient) {
        this.searchMovies('SpiderMan');  // Load default movies
    }

    searchMovies(title: string): void {
        this.http.get<any>(`${this.API_URL}&s=${title}`).subscribe(response => {
            console.log("API Response:", response);  // Debugging
            this.movies = response.Search || [];
        });
    }

    onSearch(): void {
        if (this.searchTerm.trim()) {
            this.searchMovies(this.searchTerm);
        }
    }
}
