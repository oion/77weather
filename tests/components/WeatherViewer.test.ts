import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';

import WeatherViewer from '~/components/WeatherViewer.vue';

const weatherData = {
  coord: { lon: -0.1257, lat: 51.5085 },
  weather: [{ id: 803, main: 'Clouds', description: 'broken clouds', icon: '04n' }],
  base: 'stations',
  main: {
    temp: 6.56,
    feels_like: 4.61,
    temp_min: 5.9,
    temp_max: 7.3,
    pressure: 1024,
    humidity: 83,
    sea_level: 1024,
    grnd_level: 1019,
  },
  visibility: 10000,
  wind: { speed: 2.68, deg: 236, gust: 4.47 },
  clouds: { all: 75 },
  dt: 1734984769,
  sys: {
    type: 2,
    id: 2075535,
    country: 'GB',
    sunrise: 1734941093,
    sunset: 1734969269,
  },
  timezone: 0,
  id: 2643743,
  name: 'London',
  cod: 200,
};

const componentDefaults = {
  props: {
    weather: weatherData,
  },
};

describe('Mounting', () => {
  test('Component', async () => {
    const component = mount(WeatherViewer, componentDefaults);

    expect(component.exists()).toBeTruthy();
  });
});

describe('Visibility', () => {
  test('Title', async () => {
    const component = mount(WeatherViewer, componentDefaults);

    expect(component.find('h2')).toBeTruthy();
  });

  test.todo('Rest of the required DOM elements');
});

describe('Props', () => {
  test('Title', async () => {
    const component = mount(WeatherViewer, componentDefaults);

    expect(component.find('h2').text()).contains('London');

    expect(component.find('h2').text()).contains('GB');
  });

  test('No weather data available', async () => {
    const component = mount(WeatherViewer, {
      props: {
        weather: null,
      },
    });

    expect(component.find('.no-data').text()).contains('No weather data available');
  });

  test.todo('Test Props for the required DOM elements');
});

describe('Events', () => {
  test.todo('Test Events');
});
