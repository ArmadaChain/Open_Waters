const response = (err) => {
  if (err.isAxiosError) {
    return new Error(err.response.data.message)
  }
  return err instanceof Error ? err : new Error(String(err))
}

module.exports = {response}
