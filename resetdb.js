const Part = require('./models/part');
const Category = require('./models/category');

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

async function main() { 
  await emptyCollections();
  await populateCategories();
  await populateParts();
}

async function emptyCollections() {
  const categories = (await Category.find({})).length;
  if (categories > 0) {
    console.log(`Found ${categories} categories. Deleting...`);
    await Category.deleteMany({});
  }

  const parts = (await Part.find({})).length;
  if (parts > 0) {
    console.log(`Found ${parts} parts. Deleting...`);
    await Part.deleteMany({});
  }
}

async function populateCategories() {
  await Promise.all([
    Category.create({
      name: 'CPU',
      description: 'A CPU (Central Processing Unit) or Processor is the part of a computer that is responsible for performing calculations. A CPU in a computer is analogous to that of a brain in a person or an engine in a car. Fast CPUs are generally desirable because they allow computers to complete tasks quickly. There are several different classes of CPU including Desktop and Laptop. Laptop CPUs need to be as energy efficient as possible whereas Desktop CPUs are more performance focussed.',
    }), Category.create({
      name: 'GPU',
      description: 'The GPU evolved as a complement to its close cousin, the CPU (central processing unit). While CPUs have continued to deliver performance increases through architectural innovations, faster clock speeds, and the addition of cores, GPUs are specifically designed to accelerate computer graphics workloads. When shopping for a system, it can be helpful to know the role of the CPU vs. GPU so you can make the most of both.',
    }), Category.create({
      name: 'SSD',
      description: 'An SSD, or solid-state drive, is a type of storage device used in computers. This non-volatile storage media stores persistent data on solid-state flash memory. SSDs replace traditional hard disk drives (HDDs) in computers and perform the same basic functions as a hard drive. But SSDs are significantly faster in comparison. With an SSD, the device\'s operating system will boot up more rapidly, programs will load quicker and files can be saved faster.',
    }), Category.create({
      name: 'RAM',
      description: 'RAM (Random Access Memory) is the hardware in a computing device where the operating system (OS), application programs and data in current use are kept so they can be quickly reached by the device\'s processor. RAM is the main memory in a computer. It is much faster to read from and write to than other kinds of storage, such as a hard disk drive (HDD), solid-state drive (SSD) or optical drive.',
    }),
  ]);

  console.log('Successfully populated Categories collection.');
}

async function populateParts() {
  const cpuId = await Category.findOne({ name: 'CPU' });
  const gpuId = await Category.findOne({ name: 'GPU' });
  const ssdId = await Category.findOne({ name: 'SSD' });
  const ramId = await Category.findOne({ name: 'RAM' });

  function getRandomStockAmount() {
    return Math.floor(Math.random() * 15);
  } 

  await Promise.all([

    // cpus

    Part.create({
      name: 'Intel Core i5-13600K',
      description: 'Intel’s 13th gen. Raptor Lake CPUs offer around 10% faster gaming and 45% faster multi-core performance than their predecessors. The new CPUs are compatible with DDR4 memory and Z690/B660 ($150) motherboards. New high-end gaming builders need look no further than the 13600K. The 13600K beats AMD’s flagship 7950X in gaming and almost matches the 7900X in multi-core performance.',
      price: 270.00,
      stock: getRandomStockAmount(),
      category: cpuId,
    }), Part.create({
      name: 'Intel Core i9-13900K',
      description: 'Intel’s 13th gen. Raptor Lake CPUs offer around 10% faster gaming and 45% faster multi-core performance than their predecessors. The new CPUs are compatible with DDR4 memory and Z690/B660 ($150) motherboards. New high-end gaming builders need look no further than the 13600K. The 13600K beats AMD’s flagship 7950X in gaming and almost matches the 7900X in multi-core performance.',
      price: 543.00,
      stock: getRandomStockAmount(),
      category: cpuId,
    }), Part.create({
      name: 'AMD Ryzen 5 3600',
      description: 'AMD’s Ryzen 5 3600 is a 6-core, 12-threaded processor which succeeds the Ryzen 5 2600 improving upon it by 13% in terms of overclocked performance. The 3600 is in competition with Intel’s 6-core i5-9600K. AMD continues to push the multi-core performance envelope: benchmarks show that the 3600 has a 27% overclocked 64-core lead over the 9600K but that the i5-9600K leads by 14% on single to hex core workloads which translates to 10% higher EFps in most of the today’s top games (e.g. PUBG, GTAV and CSGO).',
      price: 113.00,
      stock: getRandomStockAmount(),
      category: cpuId,
    }), 

    // gpus

    Part.create({
      name: 'Nvidia RTX 4060',
      description: 'The RTX 4060 is based on Nvidia’s Ada Lovelace architecture. It features 3,072 cores with base / boost clocks of 1.8 / 2.5 GHz, 8 GB of memory, a 128-bit memory bus, 24 3rd gen RT cores, 96 4th gen Tensor cores, DLSS 3 (with frame generation), a TDP of 115W and a launch price of $300 USD. The 4060 is around 20% faster than the 3060 at a 10% lower MSRP and offers similar performance to the 3060-Ti at a 30% lower MSRP. 8GB of memory is more than enough for most gamers, who are best off playing at 1080p.',
      price: 295.00,
      stock: getRandomStockAmount(),
      category: gpuId,
    }), Part.create({
      name: 'Nvidia GTX 1660-Ti',
      description: 'The GTX 1660 Ti the latest mid-range and mid-priced graphics card for gamers, succeeding the now two year old GTX 1060 6GB. As NVIDIA have tried to imply with their naming convention, performance of this 16 series GPU lies somewhere between their 10 series and 20 series but the 16 does not contain any of the recent RTX cores, which given the lack of RTX ready games, by itself is no hindrance at all.',
      price: 349.00,
      stock: getRandomStockAmount(),
      category: gpuId,
    }), Part.create({
      name: 'AMD RX 580',
      description: 'The RX 580 launched this week and is AMD’s latest flagship GPU which is based on a second generation Polaris architecture. The 580 is a refresh of the RX 480 which was released just 10 months ago. Modifications to the architecture have resulted in improved thermals and increased clock speeds by around 10%. The RX 580 will come with either 4GB or 8GB of high-bandwidth GDDR5 memory.',
      price: 160.00,
      stock: getRandomStockAmount(),
      category: gpuId,
    }), 

    // ssds

    Part.create({
      name: 'Crucial MV500 250GB',
      description: 'The MX500 is Crucial’s current flagship consumer SATA SSD featuring their latest second generation 64-layer 3D TLC NAND. It’s available in 250 GB, 500 GB, 1 TB and 2 TB capacities in a 2.5-inch form factor. All but the 2 TB version will also be available in M.2 (2280) form in the future. The MX500 features a Silicon Motion SM2258 controller which is a change from the Marvell 88SS1074 controller featured in the MX300 (it’s nearly two year old predecessor).',
      price: 30.00,
      stock: getRandomStockAmount(),
      category: ssdId,
    }), Part.create({
      name: 'Samsung 850 Evo 120GB',
      price: 80.00,
      stock: getRandomStockAmount(),
      category: ssdId,
    }), Part.create({
      name: 'HyperX Savage 240GB',
      description: 'The 240GB Kingston HyperX Savage sports a Phison PS3110 controller. This marks a welcome departure from Kingston\'s use of Sandforce 2281 controllers and for the first time in years gives Kinston a shot at competing in the enthusiast/performance segment of the SSD market. Comparing the HyperX Savage and Fury shows that the new Phision controller has an effective speed that is around 40% faster than the Sandforce based Fury.',
      price: 123.00,
      stock: getRandomStockAmount(),
      category: ssdId,
    }), 

    // ram

    Part.create({
      name: 'Corsair Vengeance LPX DDR4 3200 C16 2x8GB',
      description: 'For both gamers and desktop users 2x8GB 3200Mhz C16 RAM sits in the sweet spot for price to performance. Given its prolific popularity, the Corsair Vengeance LPX kit is almost guaranteed to work with every motherboard.',
      price: 42.00,
      stock: getRandomStockAmount(),
      category: ramId,
    }), Part.create({
      name: 'G.SKILL Ripjaws V DDR4 3200 C16 2x8GB',
      price: 40.00,
      stock: getRandomStockAmount(),
      category: ramId,
    }), Part.create({
      name: 'HyperX Fury DDR4 2133 C14 1x8GB',
      price: 24.00,
      stock: getRandomStockAmount(),
      category: ramId,
    }), 
  ]);

  // populating the category arrays, too

  cpuId.items = await Part.find({ category: cpuId });
  await cpuId.save();
  gpuId.items = await Part.find({ category: gpuId });
  await gpuId.save();
  ssdId.items = await Part.find({ category: ssdId });
  await ssdId.save();
  ramId.items = await Part.find({ category: ramId });
  await ramId.save();

  console.log('Successfully populated Parts collection.');
}

module.exports = main;