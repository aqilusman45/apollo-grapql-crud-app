import { Resolver, Mutation, Arg, Int, Query, InputType, Field } from 'type-graphql';
import { Movie } from '../entity/Movie';

@InputType()
class MovieInputTypes {
  @Field(() => Int)
  id: number
  
  @Field()
  title: string

  @Field(() => Int)
  minutes: number
}

@InputType()
class MovieUpdateInputTypes {
  @Field(() => Int)
  id: number
  
  @Field({ nullable : true})
  title?: string

  @Field(() => Int , { nullable : true})
  minutes?: number
}


@Resolver()
export class MovieResolver {
  // create
  @Mutation(() => Movie) // also get the movie
  async creatMovie(
    // @Arg("title", () => String) title: string,
    // @Arg("minutes", () => Int) minutes: number
    @Arg("options", () => MovieInputTypes) options: MovieInputTypes,
    ) {
      const { title, minutes } = options
      return await Movie.create({ title, minutes }).save()
  }

  // update
  @Mutation(() => Boolean) // also get the movie
  async updateMovie( // this approach does not allow update with optional parameter
    @Arg("options", () => MovieUpdateInputTypes) options: MovieUpdateInputTypes,
    ) {
      const { id } = options
      await Movie.update({ id }, options )
      return true
  }

  // delete
  @Mutation(() => Boolean) // also get the movie
  async deleteMovie( // this approach does not allow update with optional parameter
    @Arg("id", () => Int) id: number) {
      await Movie.delete({ id })
      return true
  }

  // read
  @Query(() => [Movie])
  movies() {
    return Movie.find()
  }
}


// mutation without inputtypes
// mutation { 
// 	creatMovie(title: "bob the movie", minutes: 60)
// }

// mutation with inputtypes and get the movie

// mutation {
//   creatMovie(
//     options: {
//       title: "Zombieland1"
//       minutes: 60
//     }
//   )
//   {
//     id
//     title
//     minutes
//   }
// }

// query {
//   movies {
//     title
//   }
// }


// mutation {
//   creatMovie(
//     options: {
//       title: "Zombieland"
//       minutes: 60
//     }
//   )
// }