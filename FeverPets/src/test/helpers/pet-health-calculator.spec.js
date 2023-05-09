import { getPetHealthTier } from 'helpers/pet-health-calculator.js'
import PET_KINDS from 'constants/pet-kinds.js'
import { HEALTH_RANGES } from 'constants/health.js'

describe('getPetHealthTier', () => {
  it('should return the default health value for an unhealthy dog', function() {
    const mockDogData = {
      weight: 20,
      height: 1,
      length: 1,
      kind: PET_KINDS.DOG
    }

    const dogHealth = getPetHealthTier(mockDogData)
    expect(dogHealth).toEqual(HEALTH_RANGES.UNHEALTHY)
  })

  it('should return the default health value for a healthy dog', function() {
    const mockDogData = {
      weight: 2741,
      height: 20,
      length: 35,
      kind: PET_KINDS.DOG
    }

    const dogHealth = getPetHealthTier(mockDogData)
    expect(dogHealth).toEqual(HEALTH_RANGES.HEALTHY)
  })

  it('should return the default health value for a very healthy dog', function() {
    const mockDogData = {
      weight: 20,
      height: 10,
      length: 1,
      kind: PET_KINDS.DOG
    }

    const dogHealth = getPetHealthTier(mockDogData)
    expect(dogHealth).toEqual(HEALTH_RANGES.VERY_HEALTHY)
  })

  it('should overwrite the default health value of a cat if they have just one life left', function() {
    const mockCatData = {
      weight: 20,
      height: 10,
      length: 1,
      kind: PET_KINDS.CAT,
      number_of_lives: 1
    }

    const catHealth = getPetHealthTier(mockCatData)
    expect(catHealth).toEqual(HEALTH_RANGES.UNHEALTHY)
  })
})