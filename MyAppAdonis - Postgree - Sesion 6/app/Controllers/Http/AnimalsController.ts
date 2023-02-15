import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Animal from 'App/Models/Animal'

export default class AnimalsController {
    public async getAnimalsList() : Promise<Animal[]> {
        return await Animal.all()
    }

    public async getAnimalById({ params }: HttpContextContract) : Promise<Animal> {
        return await Animal.findOrFail(params.id)
    }

    public async getAnimalBySpecie({ params }): Promise<Animal[]> {
        return await Animal
            .query()
            .where('aniSpecie', params.specie)
    }

    public async getAnimalByMaxAge({ params }): Promise<Animal[]> {
        return await Animal
            .query()
            .where('aniAge', "<", params.age )
    }

    public async setUpdateAnimalByID({ params, request, response }: HttpContextContract) {

        const animalData = request.only([
            "aniName",
            "aniSpecie",
            "aniRace",
            "aniGender",
            "aniAge"
        ]);

        try {
            const animal = await Animal
            .query()
            .where('aniID', params.id)
            .update(
                animalData
            );
            
            response.status(200).json({
                message: "Animal updated successfully",
                animal : animal
            });
        } catch( e ) {
            console.log(e);
            return response.status(500).json({
                message: "Error updating animal"
            });
        }
    }

    public async deleteAnimalByID({ params, response }: HttpContextContract) {
        try {
            const animal = await Animal
            .query()
            .where('aniID', params.id)
            .delete();

            response.status(200).json({
                message: "Animal deleted successfully",
                animal : animal
            });
        } catch( e ){
            response.status(500).json({
                message: "Error deleting animal"
            });
        }
    }

    public async createAnimal({ request, response }: HttpContextContract) {

        const animalData = request.only([
            "aniName",
            "aniSpecie",
            "aniRace",
            "aniGender",
            "aniAge"
        ]);

        try{

            Animal.create(
                animalData
            );

            response.status(200).json({
                message: "Animal created successfully",
                animal : Animal
            })

        } catch( e ){
            console.log(e);
            return response.status(500).json({
                message: "Error creating animal"
            });
        }
    }
}
