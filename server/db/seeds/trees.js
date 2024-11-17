/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('trees').del()

  // Inserts seed entries
  await knex('trees').insert([
    {
      id: 1,
      common_name: 'Larch',
      scientific_name: 'Larix decidua',
      family: 'Pinaceae',
      height: 30.0,
      width: 10.0,
      trunk_diameter: 0.8,
      flower_color: 'Yellow',
      native_region: 'Europe',
      description: 'A deciduous conifer known for its bright green needles that turn golden yellow in fall before dropping.',
      notes: 'Prefers cooler climates; commonly found in mountainous regions.'
    },
    {
      id: 2,
      common_name: 'White Oak',
      scientific_name: 'Quercus alba',
      family: 'Fagaceae',
      height: 25.0,
      width: 18.0,
      trunk_diameter: 1.2,
      flower_color: 'Green',
      native_region: 'North America',
      description: 'A long-lived hardwood tree, prized for its dense wood and tolerance to various soil types.',
      notes: 'Attracts wildlife and is known for its acorns.'
    },
    {
      id: 3,
      common_name: 'Japanese Maple',
      scientific_name: 'Acer palmatum',
      family: 'Sapindaceae',
      height: 4.5,
      width: 4.5,
      trunk_diameter: 0.2,
      flower_color: 'Red',
      native_region: 'Japan',
      description: 'A small ornamental tree famous for its beautiful, lacy leaves that change colors in fall.',
      notes: 'Prefers partial shade and well-drained soil.'
    },
    {
      id: 4,
      common_name: 'Bald Cypress',
      scientific_name: 'Taxodium distichum',
      family: 'Cupressaceae',
      height: 35.0,
      width: 12.0,
      trunk_diameter: 1.0,
      flower_color: 'Brown',
      native_region: 'Southeastern United States',
      description: 'A deciduous conifer that grows in swampy areas and has unique "knees" that protrude from the water.',
      notes: 'Tolerant of wet conditions and often found in marshlands.'
    },
    {
      id: 5,
      common_name: 'Redwood',
      scientific_name: 'Sequoia sempervirens',
      family: 'Cupressaceae',
      height: 100.0,
      width: 8.0,
      trunk_diameter: 4.0,
      flower_color: 'Yellow',
      native_region: 'California, USA',
      description: 'The tallest tree species on Earth, found primarily in coastal California.',
      notes: 'Requires significant moisture; known for its thick, fire-resistant bark.'
    },
    {
      id: 6,
      common_name: 'Silver Birch',
      scientific_name: 'Betula pendula',
      family: 'Betulaceae',
      height: 15.0,
      width: 6.0,
      trunk_diameter: 0.5,
      flower_color: 'Green',
      native_region: 'Europe, Asia',
      description: 'A graceful tree with white bark and slender branches.',
      notes: 'Tolerates a variety of soil types; often used in landscape design.'
    },
    {
      id: 7,
      common_name: 'Ginkgo',
      scientific_name: 'Ginkgo biloba',
      family: 'Ginkgoaceae',
      height: 12.0,
      width: 8.0,
      trunk_diameter: 0.6,
      flower_color: 'None',
      native_region: 'China',
      description: 'An ancient tree with fan-shaped leaves that turn bright yellow in the fall.',
      notes: 'Highly resistant to pollution; often used in urban landscaping.'
    },
    {
      id: 8,
      common_name: 'Douglas Fir',
      scientific_name: 'Pseudotsuga menziesii',
      family: 'Pinaceae',
      height: 60.0,
      width: 15.0,
      trunk_diameter: 1.5,
      flower_color: 'None',
      native_region: 'North America',
      description: 'A fast-growing conifer, widely used as a Christmas tree and for timber.',
      notes: 'Thrives in well-drained soil; a key species in North American forestry.'
    },
    {
      id: 9,
      common_name: 'Sugar Maple',
      scientific_name: 'Acer saccharum',
      family: 'Sapindaceae',
      height: 20.0,
      width: 10.0,
      trunk_diameter: 1.0,
      flower_color: 'Yellow-green',
      native_region: 'Eastern North America',
      description: 'Known for its beautiful fall foliage and as a source of maple syrup.',
      notes: 'Prefers moist, well-drained soil and full sun.'
    },
    {
      id: 10,
      common_name: 'Blue Spruce',
      scientific_name: 'Picea pungens',
      family: 'Pinaceae',
      height: 30.0,
      width: 10.0,
      trunk_diameter: 0.8,
      flower_color: 'None',
      native_region: 'North America',
      description: 'A popular ornamental conifer with blue-green needles.',
      notes: 'Resistant to drought and cold; often used as a decorative tree.'
    }
  ])
}