import PET_KINDS from 'constants/pet-kinds.js'
import { HEALTH_RANGES, HEALTH_THRESHOLDS} from 'constants/health.js'

export function getPetHealthTier(petData) {
  const { weight, height, length } = petData
    const healthLevel = weight / (height * length)

    let healthTier = calculateDefaultHealthTier(healthLevel)
    healthTier = overwriteHealthTierByKind(healthTier, petData)

    return healthTier
}

function calculateDefaultHealthTier(healthLevel) {
    const { HEALTHY, VERY_HEALTHY } = HEALTH_THRESHOLDS

    if (healthLevel >= VERY_HEALTHY.min && healthLevel <= VERY_HEALTHY.max) return HEALTH_RANGES.VERY_HEALTHY
    if (healthLevel >= HEALTHY.min && healthLevel <= HEALTHY.max) return HEALTH_RANGES.HEALTHY

    return HEALTH_RANGES.UNHEALTHY
}

function overwriteHealthTierByKind(defaultHealth, petData) {
  let health = defaultHealth

  switch (petData.kind) {
    case PET_KINDS.CAT:
      if (petData['number_of_lives'] === 1) {
        health = HEALTH_RANGES.UNHEALTHY
      }
      break;
  }

  return health
}