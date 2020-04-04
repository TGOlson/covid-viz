import React from 'react';

import LineChart from '../components/LineChart'

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


function Overview() {
  return (
    <div>
      <p>General overview of world case growth.</p>
      <div style={{height: '600px', maxWidth:'900px'}}>
      <LineChart data={data} />
      </div>
    </div>
  );
}

export default Overview;
