export function stringResponseConvert(response) {
    const data = response.data.split('\n').filter(item => item.trim() !== '');
    const title = data[0].replace('Title: ', '');
    const content = data.slice(1);
    const transformedResponse = {
        "Title": title,
        "Content": content
    };
    return transformedResponse;
}