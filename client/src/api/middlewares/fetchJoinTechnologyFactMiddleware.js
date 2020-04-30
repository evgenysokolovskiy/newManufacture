/*

import { joinTechnologyFact } from '../urls/data'
import { fetchTechJoinTechnologyFact } from '../../store/tech/actions/techJoinTechnologyFactAction'

export function fetchJoinTechnologyFactMiddleware() {
    return dispatch => {
        fetch(joinTechnologyFact)
            .then(res => res.json())
            .then(data => {
                dispatch(fetchTechJoinTechnologyFact({ ...data }))
            })
            .catch(error => console.log(error))
    }
}

*/

import { fetchTechJoinTechnologyFact } from '../../store/tech/actions/techJoinTechnologyFactAction'

export function fetchJoinTechnologyFactMiddleware(url, self) {
    return dispatch => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                dispatch(fetchTechJoinTechnologyFact({ ...data }))
            })
            .then(() => self.setState({ isLoadedJoinTechnologyFact: true }))
            .catch(error => console.log(error))
    }
}
