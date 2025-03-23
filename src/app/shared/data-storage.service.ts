import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { map,tap,take,exhaustMap } from 'rxjs/operators'
import { ThisReceiver } from "@angular/compiler";
import { AuthService } from "../auth/auth.service";

@Injectable({providedIn: 'root'})
export class DataStorageService{
    constructor( private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {
        

    }
    storeRecipes(){
        const recipes = this.recipeService.getRecipes();
        return this.http.put('https://recipe-book-206d5-default-rtdb.firebaseio.com/recipes.json',
        recipes
        )
        .subscribe(response=>{
            console.log(response);
        });
    }
    
    fetchRecipes(){
        
            return this.http
            .get<Recipe[]>(
                'https://recipe-book-206d5-default-rtdb.firebaseio.com/recipes.json',
   //// 'https://recipe-book-2d729-default-rtdb.firebaseio.com/recipes.json',
                
            )
            .pipe(
            map(recipes=>{
            return recipes.map(recipe=>{
                return {
                    ...recipe,
                    ingredients : recipe.ingredients ? recipe.ingredients: []
                };
            });
        }),
        tap(recipes=>{
            this.recipeService.setRecipes(recipes);
        })
        );
       
        
    }
}