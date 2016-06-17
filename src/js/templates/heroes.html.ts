export const htmlTemplate = `
    <h2>My Heroes</h2>
    <ul class="heroes">
        <li *ngFor="let hero of heroes"
            [class.selected]="hero === selectedHero"
            (click)="onSelect(hero)">
            <span class="hero-element">
                <span class="badge">{{hero.id}}</span> {{hero.name}}
            </span>
            <button class="delete-button" (click)="delete(hero, $event)">Delete</button>
        </li>
    </ul>
    
    <button (click)="addHero()">Add New Hero</button>
    <div *ngIf="addingHero">
        <my-hero-detail (close)="close($event)"></my-hero-detail>
    </div>
    <div *ngIf="selectedHero">
        <h2>
            {{selectedHero.name | uppercase}} is my hero
        </h2>
        <button (click)="gotoDetail()">View Details</button>
    </div>
`;
