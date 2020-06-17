# Parcels

## Instructions

To setup project:

```sh
docker-compose up
docker exec parcels_web_1 npx sequelize-cli db:migrate
docker exec parcels_web_1 npx sequelize-cli db:seed:all
```

To run tests:

```sh
docker exec parcels_web_1 npm test
```

Example REST payloads:

```sh
curl http://localhost:3000/parcels
curl --request POST --data '{"CourierId": 1, "height": 2}' --header "Content-Type: application/json" http://localhost:3000/parcels
curl --request DELETE --header "Content-Type: application/json" http://localhost:3000/couriers/1
curl --request PUT --data '{"width": 21, "height": 22}' --header "Content-Type: application/json" http://localhost:3000/parcels/2
```

## Models

Courier:

- name

Parcel:

- width
- height
- length
- CourierId

## Endpoints

- /couriers : A courier has many parcels
- /parcels : A parcel belong to a courier
