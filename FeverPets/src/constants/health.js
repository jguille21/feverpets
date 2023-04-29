const HEALTH_RANGES = {
  UNHEALTHY: 'unhealthy',
  HEALTHY: 'healthy',
  VERY_HEALTHY: 'veryHealthy'
}

const HEALTH_THRESHOLDS = {
  HEALTHY: {
    min: 3,
    max: 5
  },
  VERY_HEALTHY: {
    min: 2,
    max: 3
  }
}

export {
  HEALTH_RANGES,
  HEALTH_THRESHOLDS
}