import * as React from 'react';
import * as dayjs from 'dayjs';
import { Wrapper } from '@googlemaps/react-wrapper';
import {
  Button,
  Center,
  Text,
  Stack,
  Code,
  Loader,
  SimpleGrid,
  NumberInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { DatePicker } from '@mantine/dates';

import { render, Map, Marker, Hotel } from './components';
import { fetchHotels } from './api/hotels';
import { ApiResponse } from './types/response';
import { ScatterData, Scatter } from './components/Scatterplot/Scatter';

const App: React.FC = () => {
  // Map
  const [location, setLocation] = React.useState<google.maps.LatLng>();
  const [zoom, setZoom] = React.useState(11);
  const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
    lat: 51.769396202277,
    lng: 19.43782866403367,
  });

  const onClick = (e: google.maps.MapMouseEvent) => {
    setLocation(e.latLng!);
  };

  const onIdle = (m: google.maps.Map) => {
    setZoom(m.getZoom()!);
    setCenter(m.getCenter()!.toJSON());
  };

  // Form
  const form = useForm({
    initialValues: {
      adults_number: 2,
      checkin_date: new Date(),
      checkout_date: dayjs(new Date()).add(1, 'day').toDate(),
    },

    validate: {
      checkin_date: (value, values) =>
        dayjs(values.checkout_date).isAfter(dayjs(value))
          ? null
          : 'Data zameldowania musi być wcześniej od wymeldowania',
    },
  });

  // Api
  const [hotels, setHotels] = React.useState<ApiResponse[]>();
  const [activeHotel, setActiveHotel] = React.useState<number>();
  const [scatterData, setScatterData] = React.useState<ScatterData[]>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (hotels) {
      const data = hotels.map((hotel) => ({
        x: hotel.min_total_price,
        y: hotel.distance,
      }));

      setScatterData(data);
    }
  }, [hotels]);

  const handleFetchHotels = async (params) => {
    setIsLoading(true);
    const results = await fetchHotels(location!, params);
    setIsLoading(false);
    setHotels(results);
  };

  // JSX
  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <Wrapper
        apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY!}
        render={render}
      >
        <Map
          center={center}
          onClick={onClick}
          onIdle={onIdle}
          zoom={zoom}
          style={{ flexGrow: '1', height: '100%' }}
        >
          <Marker position={location} />
        </Map>
      </Wrapper>
      <div
        style={{
          padding: '1rem',
          flexBasis: '50%',
          height: '100%',
          overflow: 'auto',
        }}
      >
        <form onSubmit={form.onSubmit((values) => handleFetchHotels(values))}>
          <Stack
            align="center"
            sx={(theme) => ({ marginBottom: theme.spacing.md })}
          >
            <Text size="xl">Kliknij na mapie aby wybrać miejsce docelowe</Text>
            <SimpleGrid cols={3}>
              <NumberInput
                label="Liczba dorosłych"
                min={0}
                {...form.getInputProps('adults_number')}
                required
              />
              <DatePicker
                label="Data zameldowania"
                {...form.getInputProps('checkin_date')}
              />
              <DatePicker
                label="Data wymeldowania"
                {...form.getInputProps('checkout_date')}
              />
            </SimpleGrid>
            {location && (
              <Code block>{JSON.stringify(location.toJSON(), null, 2)}</Code>
            )}
          </Stack>

          <Center
            sx={(theme) => ({
              gap: theme.spacing.sm,
              marginBottom: theme.spacing.md,
            })}
          >
            <Button onClick={() => setLocation(undefined)}>Wyczyść</Button>
            <Button disabled={!location} type="submit">
              Pobierz hotele
            </Button>
          </Center>
        </form>

        {activeHotel && hotels && (
          <Hotel
            price={hotels[activeHotel].min_total_price}
            address={hotels[activeHotel].address}
            name={hotels[activeHotel].hotel_name_trans}
            distance={hotels[activeHotel].distance}
            review={hotels[activeHotel].review_score}
            currency={hotels[activeHotel].currencycode}
          />
        )}
        <Center>
          {isLoading && <Loader />}

          {!isLoading && scatterData && (
            <Scatter
              data={scatterData}
              fill="#1971c2"
              r={5}
              setActiveHotel={setActiveHotel}
            />
          )}
        </Center>
      </div>
    </div>
  );
};

export default App;
