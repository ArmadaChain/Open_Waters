const response = (err) => {
  if (err.isAxiosError) {
    return new Error(err.response ? err.response.data.message : err.message)
  }
  return err instanceof Error ? err : new Error(String(err))
}

module.exports = { response }
