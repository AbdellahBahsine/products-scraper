exports.getName = ($, element) => {
    const name = $(element)
        .find('div[data-cy=title-recipe] > h2')
        .text()
        .trim();

    return name;
}

exports.getURL = ($, element) => {
    const baseURL = 'https://www.amazon.com';

    const relativeURL = $(element)
            .find('div[data-cy=title-recipe] > h2 > a')
            .attr('href');

    const url = relativeURL ? `${baseURL}${relativeURL}` : '';

    return url;
}

exports.getImage = ($, element) => {
    const imageURL = $(element)
    .find('span[data-component-type=s-product-image] img')
    .attr('src');

    return imageURL;
}

exports.getDeliveryDate = ($, element) => {
    const delivery_text = $(element)
        .find('[data-cy=delivery-recipe]')
        .first()
        .find('span[aria-label]')
        .first()
        .attr('aria-label') || '';

    const match = delivery_text.match(/Delivery (.+)/);
    const delivery = match ? match[1].trim() : '-';

    return delivery;
}

exports.getPrice = ($, element) => {
    const price = $(element)
        .find('div[data-cy=price-recipe] .a-price .a-offscreen')
        .first()
        .text();

    return price;
}
