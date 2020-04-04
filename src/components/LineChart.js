import React from 'react';
import { ResponsiveLineCanvas } from '@nivo/line'


// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.


const data = [
  {
    "id": "japan",
    "color": "hsl(316, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 83
      },
      {
        "x": "helicopter",
        "y": 158
      },
      {
        "x": "boat",
        "y": 135
      },
      {
        "x": "train",
        "y": 2
      },
      {
        "x": "subway",
        "y": 284
      },
      {
        "x": "bus",
        "y": 139
      },
      {
        "x": "car",
        "y": 249
      },
      {
        "x": "moto",
        "y": 286
      },
      {
        "x": "bicycle",
        "y": 28
      },
      {
        "x": "horse",
        "y": 50
      },
      {
        "x": "skateboard",
        "y": 226
      },
      {
        "x": "others",
        "y": 299
      }
    ]
  },
  {
    "id": "france",
    "color": "hsl(10, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 232
      },
      {
        "x": "helicopter",
        "y": 38
      },
      {
        "x": "boat",
        "y": 22
      },
      {
        "x": "train",
        "y": 71
      },
      {
        "x": "subway",
        "y": 169
      },
      {
        "x": "bus",
        "y": 51
      },
      {
        "x": "car",
        "y": 206
      },
      {
        "x": "moto",
        "y": 122
      },
      {
        "x": "bicycle",
        "y": 11
      },
      {
        "x": "horse",
        "y": 38
      },
      {
        "x": "skateboard",
        "y": 236
      },
      {
        "x": "others",
        "y": 41
      }
    ]
  },
  {
    "id": "us",
    "color": "hsl(108, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 8
      },
      {
        "x": "helicopter",
        "y": 123
      },
      {
        "x": "boat",
        "y": 244
      },
      {
        "x": "train",
        "y": 50
      },
      {
        "x": "subway",
        "y": 39
      },
      {
        "x": "bus",
        "y": 117
      },
      {
        "x": "car",
        "y": 44
      },
      {
        "x": "moto",
        "y": 41
      },
      {
        "x": "bicycle",
        "y": 283
      },
      {
        "x": "horse",
        "y": 272
      },
      {
        "x": "skateboard",
        "y": 86
      },
      {
        "x": "others",
        "y": 233
      }
    ]
  },
  {
    "id": "germany",
    "color": "hsl(102, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 194
      },
      {
        "x": "helicopter",
        "y": 228
      },
      {
        "x": "boat",
        "y": 7
      },
      {
        "x": "train",
        "y": 111
      },
      {
        "x": "subway",
        "y": 58
      },
      {
        "x": "bus",
        "y": 191
      },
      {
        "x": "car",
        "y": 225
      },
      {
        "x": "moto",
        "y": 142
      },
      {
        "x": "bicycle",
        "y": 46
      },
      {
        "x": "horse",
        "y": 2
      },
      {
        "x": "skateboard",
        "y": 37
      },
      {
        "x": "others",
        "y": 147
      }
    ]
  },
  {
    "id": "norway",
    "color": "hsl(253, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 201
      },
      {
        "x": "helicopter",
        "y": 4
      },
      {
        "x": "boat",
        "y": 243
      },
      {
        "x": "train",
        "y": 261
      },
      {
        "x": "subway",
        "y": 142
      },
      {
        "x": "bus",
        "y": 243
      },
      {
        "x": "car",
        "y": 270
      },
      {
        "x": "moto",
        "y": 267
      },
      {
        "x": "bicycle",
        "y": 160
      },
      {
        "x": "horse",
        "y": 139
      },
      {
        "x": "skateboard",
        "y": 50
      },
      {
        "x": "others",
        "y": 17
      }
    ]
  }
]

function LineChart() {
  return (
    <ResponsiveLineCanvas
        maxWidth={800}
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'transportation',
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'count',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        colors={{ scheme: 'nivo' }}
        pointSize={6}
        enableGridX={false}
        isInteractive={false}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
  );
}

export default LineChart
