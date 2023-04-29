import axios from 'axios'

const ApiPets = {
    getAllPets() {
        return axios.get('https://my-json-server.typicode.com/Feverup/fever_pets_data/pets')
    },
    getPetsSortedBy(sortBy, order) {
        return axios.get(`https://my-json-server.typicode.com/Feverup/fever_pets_data/pets?_sort=${sortBy}&_order=${order}`)
    },
    getPetById(id) {
        return axios.get(`https://my-json-server.typicode.com/Feverup/fever_pets_data/pets/${id}`)
    }
}

export default ApiPets