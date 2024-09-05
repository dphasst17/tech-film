export const handleFindData = async (handle: any, status?: number) => {
    const data = await handle
    if (!data) return { status: 404, message: 'Data does not available' }
    return { status: status ? status : 200, data: data }
}