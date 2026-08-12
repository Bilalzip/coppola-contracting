import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { flooringProducts as importedFlooringProducts } from '../../../data/flooringProducts';

// Product images
const TCN103_Sable_1 = '/Images/products/flooring-images/Screenshot 2025-09-02 102611.png';
const TCN103_Sable_2 = '/Images/products/flooring-images/Screenshot 2025-09-02 102611.png';
const TCN103_Sable_3 = '/Images/products/flooring-images/Screenshot 2025-09-02 102611.png';

const TCN102_Tusk_1 = '/Images/products/flooring-images/Screenshot 2025-09-02 102624.png';
const TCN102_Tusk_2 = '/Images/products/flooring-images/Screenshot 2025-09-02 102624.png';
const TCN102_Tusk_3 = '/Images/products/flooring-images/Screenshot 2025-09-02 102624.png';

const TCN101_Oyster_1 = '/Images/products/flooring-images/Screenshot 2025-09-02 102629.png';
const TCN101_Oyster_3 = '/Images/products/flooring-images/Screenshot 2025-09-02 102629.png';
const TCN101_Oyster_4 = '/Images/products/flooring-images/Screenshot 2025-09-02 102629.png';

const TCN106_Shadow_1 = '/Images/products/flooring-images/Screenshot 2025-09-02 102637.png';
const TCN106_Shadow_2 = '/Images/products/flooring-images/Screenshot 2025-09-02 102637.png';
const TCN106_Shadow_3 = '/Images/products/flooring-images/Screenshot 2025-09-02 102637.png';

const TCN105_Sky_1 = '/Images/products/flooring-images/Screenshot 2025-09-02 102643.png';
const TCN105_Sky_2 = '/Images/products/flooring-images/Screenshot 2025-09-02 102643.png';
const TCN105_Sky_4 = '/Images/products/flooring-images/Screenshot 2025-09-02 102643.png';

const TCN104_Woodland_1 = '/Images/products/flooring-images/Screenshot 2025-09-02 102651.png';
const TCN104_Woodland_2 = '/Images/products/flooring-images/Screenshot 2025-09-02 102651.png';

// 3mm Engineered Hardwood products
const TCN203_Satin_1 = '/Images/products/flooring-images/Screenshot 2025-09-02 103000.png';
const TCN203_Satin_2 = '/Images/products/flooring-images/Screenshot 2025-09-02 103000.png';
const TCN203_Satin_3 = '/Images/products/flooring-images/Screenshot 2025-09-02 103000.png';

const TCN201_Silk_1 = '/Images/products/flooring-images/Screenshot 2025-09-02 103207.png';
const TCN201_Silk_2 = '/Images/products/flooring-images/Screenshot 2025-09-02 103207.png';
const TCN201_Silk_3 = '/Images/products/flooring-images/Screenshot 2025-09-02 103207.png';

const TCN202_Shell_1 = '/Images/products/flooring-images/Screenshot 2025-09-02 103303.png';
const TCN202_Shell_2 = '/Images/products/flooring-images/Screenshot 2025-09-02 103303.png';
const TCN202_Shell_3 = '/Images/products/flooring-images/Screenshot 2025-09-02 103303.png';

const TCN206_Solitude_1 = '/Images/products/flooring-images/Screenshot 2025-09-02 103309.png';
const TCN206_Solitude_2 = '/Images/products/flooring-images/Screenshot 2025-09-02 103309.png';
const TCN206_Solitude_3 = '/Images/products/flooring-images/Screenshot 2025-09-02 103309.png';

const TCN205_Cashmere_1 = '/Images/products/flooring-images/Screenshot 2025-09-02 103309.png';
const TCN205_Cashmere_2 = '/Images/products/flooring-images/Screenshot 2025-09-02 103309.png';
const TCN205_Cashmere_3 = '/Images/products/flooring-images/Screenshot 2025-09-02 103309.png';

const TCN204_Hazelnut_1 = '/Images/products/flooring-images/Screenshot 2025-09-02 103315.png';
const TCN204_Hazelnut_2 = '/Images/products/flooring-images/Screenshot 2025-09-02 103315.png';
const TCN204_Hazelnut_3 = '/Images/products/flooring-images/Screenshot 2025-09-02 103315.png';

// Luxury LooseLay Vinyl products
const UrbanMaple_1 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLL6010-Urban-Maple-min-scaled.jpg';
const UrbanMaple_2 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLL6010-Urban-Maple-min-scaled.jpg';
const UrbanMaple_3 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLL6010-Urban-Maple-min-scaled.jpg';

const Cava_1 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLL6009-Cava-min-scaled.jpg';
const Cava_2 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLL6009-Cava-min-scaled.jpg';
const Cava_3 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLL6009-Cava-min-scaled.jpg';

const SnowWhite_1 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLL6008-Snow-White-min-scaled.jpg';
const SnowWhite_2 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLL6008-Snow-White-min-scaled.jpg';
const SnowWhite_3 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLL6008-Snow-White-min-scaled.jpg';

const PaleRider_1 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLL6007-Pale-Rider-min-scaled.jpg';
const PaleRider_2 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLL6007-Pale-Rider-min-scaled.jpg';
const PaleRider_3 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLL6007-Pale-Rider-min-scaled.jpg';

const Smoke_1 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLL6006-Smoke-min-scaled.jpg';
const Smoke_2 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLL6006-Smoke-min-scaled.jpg';
const Smoke_3 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLL6006-Smoke-min-scaled.jpg';

const Hewn_1 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLL6005-Hewn-min-scaled.jpg';
const Hewn_2 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLL6005-Hewn-min-scaled.jpg';
const Hewn_3 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLL6005-Hewn-min-scaled.jpg';

const Corral_1 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLL6004-Corral-min-scaled.jpg';
const Corral_2 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLL6004-Corral-min-scaled.jpg';
const Corral_3 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLL6004-Corral-min-scaled.jpg';

const Bolero_1 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLL6003-Bolero-min-scaled.jpg';
const Bolero_2 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLL6003-Bolero-min-scaled.jpg';
const Bolero_3 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLL6003-Bolero-min-scaled.jpg';

const Leather_1 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLL6002-Leather-min-scaled.jpg';
const Leather_2 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLL6002-Leather-min-scaled.jpg';
const Leather_3 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLL6002-Leather-min-scaled.jpg';

const Eclipse_1 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLL6001-Eclipse-min-scaled.jpg';
const Eclipse_2 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLL6001-Eclipse-min-scaled.jpg';
const Eclipse_3 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLL6001-Eclipse-min-scaled.jpg';

// Home Luxury Vinyl 55 products
const Ranch_1 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLS1012-Ranch-scaled.jpg';
const Ranch_2 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLS1012-Ranch-scaled.jpg';
const Ranch_3 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLS1012-Ranch-scaled.jpg';

const Ivory_1 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLS1011-Ivory-min-scaled.jpg';
const Ivory_2 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLS1011-Ivory-min-scaled.jpg';
const Ivory_3 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLS1011-Ivory-min-scaled.jpg';

const Nutmeg_1 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLS1010-Nutmeg-min-scaled.jpg';
const Nutmeg_2 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLS1010-Nutmeg-min-scaled.jpg';
const Nutmeg_3 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLS1010-Nutmeg-min-scaled.jpg';

const ShadeOfGrey_1 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLS1009-Shade-of-Grey-min-scaled.jpg';
const ShadeOfGrey_2 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLS1009-Shade-of-Grey-min-scaled.jpg';
const ShadeOfGrey_3 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLS1009-Shade-of-Grey-min-scaled.jpg';

const MilkChocolate_1 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLS1008-Milk-Chocolate-min-scaled.jpg';
const MilkChocolate_2 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLS1008-Milk-Chocolate-min-scaled.jpg';
const MilkChocolate_3 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLS1008-Milk-Chocolate-min-scaled.jpg';

const Midnight_1 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLS1007-Midnight-min-scaled.jpg';
const Midnight_2 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLS1007-Midnight-min-scaled.jpg';
const Midnight_3 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLS1007-Midnight-min-scaled.jpg';

const Iceberg_1 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLS1006-Iceberg-min-scaled.jpg';
const Iceberg_2 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLS1006-Iceberg-min-scaled.jpg';
const Iceberg_3 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLS1006-Iceberg-min-scaled.jpg';

const Tempest_1 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLS1005-Tempest-min-scaled.jpg';
const Tempest_2 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLS1005-Tempest-min-scaled.jpg';
const Tempest_3 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLS1005-Tempest-min-scaled.jpg';

const Eclectic_1 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLS1004-Eclectic-scaled.jpg';
const Eclectic_2 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLS1004-Eclectic-scaled.jpg';
const Eclectic_3 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLS1004-Eclectic-scaled.jpg';

const Slate_1 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLS1002-Slate-min-scaled.jpg';
const Slate_2 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLS1002-Slate-min-scaled.jpg';
const Slate_3 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLS1002-Slate-min-scaled.jpg';

const Blizzard_1 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLS1001-Blizzard-min-scaled.jpg';
const Blizzard_2 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLS1001-Blizzard-min-scaled.jpg';
const Blizzard_3 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLS1001-Blizzard-min-scaled.jpg';

const BandsawnGrey_1 = 'https://triforestfloors.com/wp-content/uploads/2022/07/FLS1003-Bandsawn-Grey-scaled.jpg';
const BandsawnGrey_2 = 'https://triforestfloors.com/wp-content/uploads/2022/07/FLS1003-Bandsawn-Grey-scaled.jpg';
const BandsawnGrey_3 = 'https://triforestfloors.com/wp-content/uploads/2022/07/FLS1003-Bandsawn-Grey-scaled.jpg';

// Estate Luxury Vinyl 65 products
const Frozen_1 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLS2010-Frozen-scaled.jpg';
const Frozen_2 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLS2010-Frozen-scaled.jpg';
const Frozen_3 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLS2010-Frozen-scaled.jpg';

const BoneGrey_1 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLS2009-Bone-Grey-scaled.jpg';
const BoneGrey_2 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLS2009-Bone-Grey-scaled.jpg';
const BoneGrey_3 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLS2009-Bone-Grey-scaled.jpg';

const AntiqueBrown_1 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLS2008-Antique-Brown-scaled.jpg';
const AntiqueBrown_2 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLS2008-Antique-Brown-scaled.jpg';
const AntiqueBrown_3 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLS2008-Antique-Brown-scaled.jpg';

const Misty_1 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLS2007-Misty-scaled.jpg';
const Misty_2 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLS2007-Misty-scaled.jpg';
const Misty_3 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLS2007-Misty-scaled.jpg';

const Osso_1 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLS2006-Osso-scaled.jpg';
const Osso_2 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLS2006-Osso-scaled.jpg';
const Osso_3 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLS2006-Osso-scaled.jpg';

const CathedralGrey_1 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLS2005-Cathedral-Grey-scaled.jpg';
const CathedralGrey_2 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLS2005-Cathedral-Grey-scaled.jpg';
const CathedralGrey_3 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLS2005-Cathedral-Grey-scaled.jpg';

const GreyWalnut_1 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLS2004-Grey-Walnut-scaled.jpg';
const GreyWalnut_2 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLS2004-Grey-Walnut-scaled.jpg';
const GreyWalnut_3 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLS2004-Grey-Walnut-scaled.jpg';

const AgedOak_1 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLS2003-Aged-Oak-scaled.jpg';
const AgedOak_2 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLS2003-Aged-Oak-scaled.jpg';
const AgedOak_3 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLS2003-Aged-Oak-scaled.jpg';

const NightSky_1 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLS2002-Night-Sky-scaled.jpg';
const NightSky_2 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLS2002-Night-Sky-scaled.jpg';
const NightSky_3 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLS2002-Night-Sky-scaled.jpg';

const LoftGrey_1 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLS2001-Loft-Grey-scaled.jpg';
const LoftGrey_2 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLS2001-Loft-Grey-scaled.jpg';
const LoftGrey_3 = 'https://triforestfloors.com/wp-content/uploads/2021/08/FLS2001-Loft-Grey-scaled.jpg';

const Sahara_1 = 'https://triforestfloors.com/wp-content/uploads/2022/07/FLS2012-Sahara-scaled.jpg';
const Sahara_2 = 'https://triforestfloors.com/wp-content/uploads/2022/07/FLS2012-Sahara-scaled.jpg';
const Sahara_3 = 'https://triforestfloors.com/wp-content/uploads/2022/07/FLS2012-Sahara-scaled.jpg';

const Cafe_1 = 'https://triforestfloors.com/wp-content/uploads/2022/07/FLS2011-Cafe-scaled.jpg';
const Cafe_2 = 'https://triforestfloors.com/wp-content/uploads/2022/07/FLS2011-Cafe-scaled.jpg';
const Cafe_3 = 'https://triforestfloors.com/wp-content/uploads/2022/07/FLS2011-Cafe-scaled.jpg';

// New Luxury Vinyl TFL products
const TFL625_WhistlerPine_1 = '/Images/products/flooring-images/Screenshot 2025-09-16 020612.png';
const TFL625_WhistlerPine_2 = '/Images/products/flooring-images/Screenshot 2025-09-16 020612.png';
const TFL625_WhistlerPine_3 = '/Images/products/flooring-images/Screenshot 2025-09-16 020612.png';

const TFL602_NewYork_1 = '/Images/products/flooring-images/Screenshot 2025-09-16 021056.png';
const TFL602_NewYork_2 = '/Images/products/flooring-images/Screenshot 2025-09-16 021056.png';
const TFL602_NewYork_3 = '/Images/products/flooring-images/Screenshot 2025-09-16 021056.png';

const TFL605_StoneWood_1 = '/Images/products/flooring-images/Screenshot 2025-09-16 021233.png';
const TFL605_StoneWood_2 = '/Images/products/flooring-images/Screenshot 2025-09-16 021233.png';
const TFL605_StoneWood_3 = '/Images/products/flooring-images/Screenshot 2025-09-16 021233.png';

const TFL604_Chicago_1 = '/Images/products/flooring-images/Screenshot 2025-09-16 021425.png';
const TFL604_Chicago_2 = '/Images/products/flooring-images/Screenshot 2025-09-16 021425.png';
const TFL604_Chicago_3 = '/Images/products/flooring-images/Screenshot 2025-09-16 021425.png';

const TFL627_HoneyBirch_1 = '/Images/products/flooring-images/Screenshot 2025-09-16 021525.png';
const TFL627_HoneyBirch_2 = '/Images/products/flooring-images/Screenshot 2025-09-16 021525.png';
const TFL627_HoneyBirch_3 = '/Images/products/flooring-images/Screenshot 2025-09-16 021525.png';

const TFL628_HudsonSand_1 = '/Images/products/flooring-images/Screenshot 2025-09-16 021625.png';
const TFL628_HudsonSand_2 = '/Images/products/flooring-images/Screenshot 2025-09-16 021625.png';
const TFL628_HudsonSand_3 = '/Images/products/flooring-images/Screenshot 2025-09-16 021625.png';

const TFL610_CityLoft_1 = '/Images/products/flooring-images/Screenshot 2025-09-16 021807.png';
const TFL610_CityLoft_2 = '/Images/products/flooring-images/Screenshot 2025-09-16 021807.png';
const TFL610_CityLoft_3 = '/Images/products/flooring-images/Screenshot 2025-09-16 021807.png';

const TFL607_DynamicGrey_1 = '/Images/products/flooring-images/Screenshot 2025-09-16 021852.png';
const TFL607_DynamicGrey_2 = '/Images/products/flooring-images/Screenshot 2025-09-16 021852.png';
const TFL607_DynamicGrey_3 = '/Images/products/flooring-images/Screenshot 2025-09-16 021852.png';

// Additional TFL Luxury Vinyl products
const TFL622_ChestnutCanyon_1 = '/Images/products/flooring-images/Screenshot 2025-09-16 022921.png';
const TFL622_ChestnutCanyon_2 = '/Images/products/flooring-images/Screenshot 2025-09-16 022921.png';
const TFL622_ChestnutCanyon_3 = '/Images/products/flooring-images/Screenshot 2025-09-16 022921.png';

const TFL626_PrairieWheat_1 = '/Images/products/flooring-images/Screenshot 2025-09-16 022931.png';
const TFL626_PrairieWheat_2 = '/Images/products/flooring-images/Screenshot 2025-09-16 022931.png';
const TFL626_PrairieWheat_3 = '/Images/products/flooring-images/Screenshot 2025-09-16 022931.png';

const TFL624_AutumnGlow_1 = '/Images/products/flooring-images/Screenshot 2025-09-16 022938.png';
const TFL624_AutumnGlow_2 = '/Images/products/flooring-images/Screenshot 2025-09-16 022938.png';
const TFL624_AutumnGlow_3 = '/Images/products/flooring-images/Screenshot 2025-09-16 022938.png';

const TFL623_NorthernFog_1 = '/Images/products/flooring-images/Screenshot 2025-09-16 022947.png';
const TFL623_NorthernFog_2 = '/Images/products/flooring-images/Screenshot 2025-09-16 022947.png';
const TFL623_NorthernFog_3 = '/Images/products/flooring-images/Screenshot 2025-09-16 022947.png';

const TFL608_SeaHorizon_1 = '/Images/products/flooring-images/Screenshot 2025-09-16 022956.png';
const TFL608_SeaHorizon_2 = '/Images/products/flooring-images/Screenshot 2025-09-16 022956.png';
const TFL608_SeaHorizon_3 = '/Images/products/flooring-images/Screenshot 2025-09-16 022956.png';

const TFL621_EspressoCedar_1 = '/Images/products/flooring-images/Screenshot 2025-09-16 023004.png';
const TFL621_EspressoCedar_2 = '/Images/products/flooring-images/Screenshot 2025-09-16 023004.png';
const TFL621_EspressoCedar_3 = '/Images/products/flooring-images/Screenshot 2025-09-16 023004.png';

const TFL609_ModernGrey_1 = '/Images/products/flooring-images/Screenshot 2025-09-16 023014.png';
const TFL609_ModernGrey_2 = '/Images/products/flooring-images/Screenshot 2025-09-16 023014.png';
const TFL609_ModernGrey_3 = '/Images/products/flooring-images/Screenshot 2025-09-16 023014.png';

// New TFSPC Luxury LooseLay products
const TFSPC212F_Rosewood_1 = '/Images/products/flooring-images/Screenshot 2025-09-17 024434.png';
const TFSPC212F_Rosewood_2 = '/Images/products/flooring-images/Screenshot 2025-09-17 024434.png';
const TFSPC212F_Rosewood_3 = '/Images/products/flooring-images/Screenshot 2025-09-17 024434.png';

const TFSPC211F_LondonFog_1 = '/Images/products/flooring-images/Screenshot 2025-09-17 024441.png';
const TFSPC211F_LondonFog_2 = '/Images/products/flooring-images/Screenshot 2025-09-17 024441.png';
const TFSPC211F_LondonFog_3 = '/Images/products/flooring-images/Screenshot 2025-09-17 024441.png';

const TFSPC210F_FrenchWalnut_1 = '/Images/products/flooring-images/Screenshot 2025-09-17 024457.png';
const TFSPC210F_FrenchWalnut_2 = '/Images/products/flooring-images/Screenshot 2025-09-17 024457.png';
const TFSPC210F_FrenchWalnut_3 = '/Images/products/flooring-images/Screenshot 2025-09-17 024457.png';

const TFSPC206F_GreyWalnut_1 = '/Images/products/flooring-images/Screenshot 2025-09-17 024504.png';
const TFSPC206F_GreyWalnut_2 = '/Images/products/flooring-images/Screenshot 2025-09-17 024504.png';
const TFSPC206F_GreyWalnut_3 = '/Images/products/flooring-images/Screenshot 2025-09-17 024504.png';

const TFSPC205F_Copper_1 = '/Images/products/flooring-images/Screenshot 2025-09-17 024512.png';
const TFSPC205F_Copper_2 = '/Images/products/flooring-images/Screenshot 2025-09-17 024512.png';
const TFSPC205F_Copper_3 = '/Images/products/flooring-images/Screenshot 2025-09-17 024512.png';

const TFSPC203F_CobaltGrey_1 = '/Images/products/flooring-images/Screenshot 2025-09-17 024521.png';
const TFSPC203F_CobaltGrey_2 = '/Images/products/flooring-images/Screenshot 2025-09-17 024521.png';
const TFSPC203F_CobaltGrey_3 = '/Images/products/flooring-images/Screenshot 2025-09-17 024521.png';

const TFSPC202F_EverestGrey_1 = '/Images/products/flooring-images/Screenshot 2025-09-17 024527.png';
const TFSPC202F_EverestGrey_2 = '/Images/products/flooring-images/Screenshot 2025-09-17 024527.png';
const TFSPC202F_EverestGrey_3 = '/Images/products/flooring-images/Screenshot 2025-09-17 024527.png';

const TFSPC201F_NickelGrey_1 = '/Images/products/flooring-images/Screenshot 2025-09-17 024534.png';
const TFSPC201F_NickelGrey_2 = '/Images/products/flooring-images/Screenshot 2025-09-17 024534.png';
const TFSPC201F_NickelGrey_3 = '/Images/products/flooring-images/Screenshot 2025-09-17 024534.png';

const Flooring = (): JSX.Element => {
  const [selectedFilters, setSelectedFilters] = useState<{
    category: string[];
    thickness: string[];
  }>({
    category: [],
    thickness: []
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const toggleFilter = (category: keyof typeof selectedFilters, value: string) => {
    setSelectedFilters(prev => {
      const currentValues = prev[category];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];

      return {
        ...prev,
        [category]: newValues
      };
    });
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      category: [],
      thickness: []
    });
    setCurrentPage(1); // Reset to first page when clearing filters
  };

  // Hardcoded products array
  const hardcodedProducts: any[] = [
    // TCN103 | Sable
    {
      id: 'TCN103',
      name: 'TCN103 | Sable',
      category: 'engineered-hardwood',
      thickness: ['2mm'],
      color: 'Sable',
      shade: 'Warm',
      tone: 'Medium',
      dimensions: {
        length: 'RL up to 1900mm',
        width: '165mm',
        thickness: '18mm'
      },
      wearLayer: {
        species: 'American Oak',
        thickness: '2mm'
      },
      finish: 'Light Wire Brushed, UV protected',
      warranty: '30 Years Residential',
      bevel: '4 Sided Micro-Bevel',
      plySpecies: 'Eucalyptus and Acacia',
      package: {
        m2PerBox: '1.881',
        sqftPerBox: '20.25',
        boxPerSkid: '48'
      },
      images: [TCN103_Sable_1, TCN103_Sable_2, TCN103_Sable_3],
      inStock: true,
      rating: 4.8
    },
    // TCN102 | Tusk
    {
      id: 'TCN102',
      name: 'TCN102 | Tusk',
      category: 'engineered-hardwood',
      thickness: ['2mm'],
      color: 'Tusk',
      shade: 'Warm',
      tone: 'Medium',
      dimensions: {
        length: 'RL up to 1900mm',
        width: '165mm',
        thickness: '18mm'
      },
      wearLayer: {
        species: 'American Oak',
        thickness: '2mm'
      },
      finish: 'Light Wire Brushed, UV protected',
      warranty: '30 Years Residential',
      bevel: '4 Sided Micro-Bevel',
      plySpecies: 'Eucalyptus and Acacia',
      package: {
        m2PerBox: '1.881',
        sqftPerBox: '20.25',
        boxPerSkid: '48'
      },
      images: [TCN102_Tusk_1, TCN102_Tusk_2, TCN102_Tusk_3],
      inStock: true,
      rating: 4.7
    },
    // TCN101 | Oyster
    {
      id: 'TCN101',
      name: 'TCN101 | Oyster',
      category: 'engineered-hardwood',
      thickness: ['2mm'],
      color: 'Oyster',
      shade: 'Warm',
      tone: 'Medium',
      dimensions: {
        length: 'RL up to 1900mm',
        width: '165mm',
        thickness: '18mm'
      },
      wearLayer: {
        species: 'American Oak',
        thickness: '2mm'
      },
      finish: 'Light Wire Brushed, UV protected',
      warranty: '30 Years Residential',
      bevel: '4 Sided Micro-Bevel',
      plySpecies: 'Eucalyptus and Acacia',
      package: {
        m2PerBox: '1.881',
        sqftPerBox: '20.25',
        boxPerSkid: '48'
      },
      images: [TCN101_Oyster_1, TCN101_Oyster_3, TCN101_Oyster_4],
      inStock: true,
      rating: 4.6
    },
    // TCN106 | Shadow
    {
      id: 'TCN106',
      name: 'TCN106 | Shadow',
      category: 'engineered-hardwood',
      thickness: ['2mm'],
      color: 'Shadow',
      shade: 'Warm',
      tone: 'Medium',
      dimensions: {
        length: 'RL up to 1900mm',
        width: '165mm',
        thickness: '18mm'
      },
      wearLayer: {
        species: 'American Oak',
        thickness: '2mm'
      },
      finish: 'Light Wire Brushed, UV protected',
      warranty: '30 Years Residential',
      bevel: '4 Sided Micro-Bevel',
      plySpecies: 'Eucalyptus and Acacia',
      package: {
        m2PerBox: '1.881',
        sqftPerBox: '20.25',
        boxPerSkid: '48'
      },
      images: [TCN106_Shadow_1, TCN106_Shadow_2, TCN106_Shadow_3],
      inStock: true,
      rating: 4.5
    },
    // TCN105 | Sky
    {
      id: 'TCN105',
      name: 'TCN105 | Sky',
      category: 'engineered-hardwood',
      thickness: ['2mm'],
      color: 'Sky',
      shade: 'Warm',
      tone: 'Medium',
      dimensions: {
        length: 'RL up to 1900mm',
        width: '165mm',
        thickness: '18mm'
      },
      wearLayer: {
        species: 'American Oak',
        thickness: '2mm'
      },
      finish: 'Light Wire Brushed, UV protected',
      warranty: '30 Years Residential',
      bevel: '4 Sided Micro-Bevel',
      plySpecies: 'Eucalyptus and Acacia',
      package: {
        m2PerBox: '1.881',
        sqftPerBox: '20.25',
        boxPerSkid: '48'
      },
      images: [TCN105_Sky_1, TCN105_Sky_2, TCN105_Sky_4],
      inStock: true,
      rating: 4.4
    },
    // TCN104 | Woodland
    {
      id: 'TCN104',
      name: 'TCN104 | Woodland',
      category: 'engineered-hardwood',
      thickness: ['2mm'],
      color: 'Woodland',
      shade: 'Warm',
      tone: 'Medium',
      dimensions: {
        length: 'RL up to 1900mm',
        width: '165mm',
        thickness: '18mm'
      },
      wearLayer: {
        species: 'American Oak',
        thickness: '2mm'
      },
      finish: 'Light Wire Brushed, UV protected',
      warranty: '30 Years Residential',
      bevel: '4 Sided Micro-Bevel',
      plySpecies: 'Eucalyptus and Acacia',
      package: {
        m2PerBox: '1.881',
        sqftPerBox: '20.25',
        boxPerSkid: '48'
      },
      images: [TCN104_Woodland_1, TCN104_Woodland_2],
      inStock: true,
      rating: 4.3
    },
    // TCN203 | Satin (3mm)
    {
      id: 'TCN203',
      name: 'TCN203 | Satin',
      category: 'engineered-hardwood',
      thickness: ['3mm'],
      color: 'Satin',
      shade: 'Warm',
      tone: 'Medium',
      dimensions: {
        length: 'RL up to 1900mm',
        width: '190mm',
        thickness: '18mm'
      },
      wearLayer: {
        species: 'European Oak',
        thickness: '3mm'
      },
      finish: 'Light Wire Brushed, UV protected',
      warranty: '30 Years Residential',
      bevel: '4 Sided Micro-Bevel',
      plySpecies: 'Eucalyptus and Acacia',
      package: {
        m2PerBox: '2.166',
        sqftPerBox: '23.31',
        boxPerSkid: '40'
      },
      images: [TCN203_Satin_1, TCN203_Satin_2, TCN203_Satin_3],
      inStock: true,
      rating: 4.8
    },
    // TCN201 | Silk (3mm)
    {
      id: 'TCN201',
      name: 'TCN201 | Silk',
      category: 'engineered-hardwood',
      thickness: ['3mm'],
      color: 'Silk',
      shade: 'Warm',
      tone: 'Medium',
      dimensions: {
        length: 'RL up to 1900mm',
        width: '190mm',
        thickness: '18mm'
      },
      wearLayer: {
        species: 'European Oak',
        thickness: '3mm'
      },
      finish: 'Light Wire Brushed, UV protected',
      warranty: '30 Years Residential',
      bevel: '4 Sided Micro-Bevel',
      plySpecies: 'Eucalyptus and Acacia',
      package: {
        m2PerBox: '2.166',
        sqftPerBox: '23.31',
        boxPerSkid: '40'
      },
      images: [TCN201_Silk_1, TCN201_Silk_2, TCN201_Silk_3],
      inStock: true,
      rating: 4.7
    },
    // TCN202 | Shell (3mm)
    {
      id: 'TCN202',
      name: 'TCN202 | Shell',
      category: 'engineered-hardwood',
      thickness: ['3mm'],
      color: 'Shell',
      shade: 'Warm',
      tone: 'Medium',
      dimensions: {
        length: 'RL up to 1900mm',
        width: '190mm',
        thickness: '18mm'
      },
      wearLayer: {
        species: 'European Oak',
        thickness: '3mm'
      },
      finish: 'Light Wire Brushed, UV protected',
      warranty: '30 Years Residential',
      bevel: '4 Sided Micro-Bevel',
      plySpecies: 'Eucalyptus and Acacia',
      package: {
        m2PerBox: '2.166',
        sqftPerBox: '23.31',
        boxPerSkid: '40'
      },
      images: [TCN202_Shell_1, TCN202_Shell_2, TCN202_Shell_3],
      inStock: true,
      rating: 4.6
    },
    // TCN206 | Solitude (3mm)
    {
      id: 'TCN206',
      name: 'TCN206 | Solitude',
      category: 'engineered-hardwood',
      thickness: ['3mm'],
      color: 'Solitude',
      shade: 'Warm',
      tone: 'Medium',
      dimensions: {
        length: 'RL up to 1900mm',
        width: '190mm',
        thickness: '18mm'
      },
      wearLayer: {
        species: 'European Oak',
        thickness: '3mm'
      },
      finish: 'Light Wire Brushed, UV protected',
      warranty: '30 Years Residential',
      bevel: '4 Sided Micro-Bevel',
      plySpecies: 'Eucalyptus and Acacia',
      package: {
        m2PerBox: '2.166',
        sqftPerBox: '23.31',
        boxPerSkid: '40'
      },
      images: [TCN206_Solitude_1, TCN206_Solitude_2, TCN206_Solitude_3],
      inStock: true,
      rating: 4.5
    },
    // TCN205 | Cashmere (3mm)
    {
      id: 'TCN205',
      name: 'TCN205 | Cashmere',
      category: 'engineered-hardwood',
      thickness: ['3mm'],
      color: 'Cashmere',
      shade: 'Warm',
      tone: 'Medium',
      dimensions: {
        length: 'RL up to 1900mm',
        width: '190mm',
        thickness: '18mm'
      },
      wearLayer: {
        species: 'European Oak',
        thickness: '3mm'
      },
      finish: 'Light Wire Brushed, UV protected',
      warranty: '30 Years Residential',
      bevel: '4 Sided Micro-Bevel',
      plySpecies: 'Eucalyptus and Acacia',
      package: {
        m2PerBox: '2.166',
        sqftPerBox: '23.31',
        boxPerSkid: '40'
      },
      images: [TCN205_Cashmere_1, TCN205_Cashmere_2, TCN205_Cashmere_3],
      inStock: true,
      rating: 4.4
    },
    // TCN204 | Hazelnut (3mm)
    {
      id: 'TCN204',
      name: 'TCN204 | Hazelnut',
      category: 'engineered-hardwood',
      thickness: ['3mm'],
      color: 'Hazelnut',
      shade: 'Warm',
      tone: 'Medium',
      dimensions: {
        length: 'RL up to 1900mm',
        width: '190mm',
        thickness: '18mm'
      },
      wearLayer: {
        species: 'European Oak',
        thickness: '3mm'
      },
      finish: 'Light Wire Brushed, UV protected',
      warranty: '30 Years Residential',
      bevel: '4 Sided Micro-Bevel',
      plySpecies: 'Eucalyptus and Acacia',
      package: {
        m2PerBox: '2.166',
        sqftPerBox: '23.31',
        boxPerSkid: '40'
      },
      images: [TCN204_Hazelnut_1, TCN204_Hazelnut_2, TCN204_Hazelnut_3],
      inStock: true,
      rating: 4.3
    },
    // Urban Maple | Luxury LooseLay Vinyl
    {
      id: 'FLL6010',
      name: 'FLL6010 | Urban Maple',
      category: 'luxury-loose-lay',
      thickness: ['5mm'],
      color: 'Urban Maple',
      shade: 'Warm',
      tone: 'Medium',
      dimensions: {
        length: '1224mm',
        width: '190mm',
        thickness: '5.0mm'
      },
      wearLayer: {
        species: 'Vinyl',
        thickness: '20 mil / 0.5mm'
      },
      finish: 'Wood Grain Embossed',
      warranty: 'Lifetime Residential',
      bevel: 'I4F Locking System',
      plySpecies: 'Vinyl Composite',
      package: {
        m2PerBox: '2.3256',
        sqftPerBox: '25.04',
        boxPerSkid: '35'
      },
      images: [UrbanMaple_1, UrbanMaple_2, UrbanMaple_3],
      inStock: true,
      rating: 4.8
    },
    // Cava | Luxury LooseLay Vinyl
    {
      id: 'FLL6009',
      name: 'FLL6009 | Cava',
      category: 'luxury-loose-lay',
      thickness: ['5mm'],
      color: 'Cava',
      shade: 'Neutral',
      tone: 'Medium',
      dimensions: {
        length: '1224mm',
        width: '190mm',
        thickness: '5.0mm'
      },
      wearLayer: {
        species: 'Vinyl',
        thickness: '20 mil / 0.5mm'
      },
      finish: 'Enhanced Stability',
      warranty: 'Lifetime Residential',
      bevel: 'I4F Locking System',
      plySpecies: 'Vinyl Composite',
      package: {
        m2PerBox: '2.3256',
        sqftPerBox: '25.04',
        boxPerSkid: '35'
      },
      images: [Cava_1, Cava_2, Cava_3],
      inStock: true,
      rating: 4.7
    },
    // Snow White | Luxury LooseLay Vinyl
    {
      id: 'FLL6008',
      name: 'FLL6008 | Snow White',
      category: 'luxury-loose-lay',
      thickness: ['5mm'],
      color: 'Snow White',
      shade: 'Cool',
      tone: 'Light',
      dimensions: {
        length: '1224mm',
        width: '190mm',
        thickness: '5.0mm'
      },
      wearLayer: {
        species: 'Vinyl',
        thickness: '20 mil / 0.5mm'
      },
      finish: 'Enhanced Stability',
      warranty: 'Lifetime Residential',
      bevel: 'I4F Locking System',
      plySpecies: 'Vinyl Composite',
      package: {
        m2PerBox: '2.3256',
        sqftPerBox: '25.04',
        boxPerSkid: '35'
      },
      images: [SnowWhite_1, SnowWhite_2, SnowWhite_3],
      inStock: true,
      rating: 4.6
    },
    // Pale Rider | Luxury LooseLay Vinyl
    {
      id: 'FLL6007',
      name: 'FLL6007 | Pale Rider',
      category: 'luxury-loose-lay',
      thickness: ['5mm'],
      color: 'Pale Rider',
      shade: 'Neutral',
      tone: 'Light',
      dimensions: {
        length: '1224mm',
        width: '190mm',
        thickness: '5.0mm'
      },
      wearLayer: {
        species: 'Vinyl',
        thickness: '20 mil / 0.5mm'
      },
      finish: 'Enhanced Stability',
      warranty: 'Lifetime Residential',
      bevel: 'I4F Locking System',
      plySpecies: 'Vinyl Composite',
      package: {
        m2PerBox: '2.3256',
        sqftPerBox: '25.04',
        boxPerSkid: '35'
      },
      images: [PaleRider_1, PaleRider_2, PaleRider_3],
      inStock: true,
      rating: 4.5
    },
    // Smoke | Luxury LooseLay Vinyl
    {
      id: 'FLL6006',
      name: 'FLL6006 | Smoke',
      category: 'luxury-loose-lay',
      thickness: ['5mm'],
      color: 'Smoke',
      shade: 'Cool',
      tone: 'Dark',
      dimensions: {
        length: '1224mm',
        width: '190mm',
        thickness: '5.0mm'
      },
      wearLayer: {
        species: 'Vinyl',
        thickness: '20 mil / 0.5mm'
      },
      finish: 'Enhanced Stability',
      warranty: 'Lifetime Residential',
      bevel: 'I4F Locking System',
      plySpecies: 'Vinyl Composite',
      package: {
        m2PerBox: '2.3256',
        sqftPerBox: '25.04',
        boxPerSkid: '35'
      },
      images: [Smoke_1, Smoke_2, Smoke_3],
      inStock: true,
      rating: 4.4
    },
    // Hewn | Luxury LooseLay Vinyl
    {
      id: 'FLL6005',
      name: 'FLL6005 | Hewn',
      category: 'luxury-loose-lay',
      thickness: ['5mm'],
      color: 'Hewn',
      shade: 'Warm',
      tone: 'Medium',
      dimensions: {
        length: '1224mm',
        width: '190mm',
        thickness: '5.0mm'
      },
      wearLayer: {
        species: 'Vinyl',
        thickness: '20 mil / 0.5mm'
      },
      finish: 'Enhanced Stability',
      warranty: 'Lifetime Residential',
      bevel: 'I4F Locking System',
      plySpecies: 'Vinyl Composite',
      package: {
        m2PerBox: '2.3256',
        sqftPerBox: '25.04',
        boxPerSkid: '35'
      },
      images: [Hewn_1, Hewn_2, Hewn_3],
      inStock: true,
      rating: 4.3
    },
    // Corral | Luxury LooseLay Vinyl
    {
      id: 'FLL6004',
      name: 'FLL6004 | Corral',
      category: 'luxury-loose-lay',
      thickness: ['5mm'],
      color: 'Corral',
      shade: 'Warm',
      tone: 'Medium',
      dimensions: {
        length: '1224mm',
        width: '190mm',
        thickness: '5.0mm'
      },
      wearLayer: {
        species: 'Vinyl',
        thickness: '20 mil / 0.5mm'
      },
      finish: 'Enhanced Stability',
      warranty: 'Lifetime Residential',
      bevel: 'I4F Locking System',
      plySpecies: 'Vinyl Composite',
      package: {
        m2PerBox: '2.3256',
        sqftPerBox: '25.04',
        boxPerSkid: '35'
      },
      images: [Corral_1, Corral_2, Corral_3],
      inStock: true,
      rating: 4.2
    },
    // Bolero | Luxury LooseLay Vinyl
    {
      id: 'FLL6003',
      name: 'FLL6003 | Bolero',
      category: 'luxury-loose-lay',
      thickness: ['5mm'],
      color: 'Bolero',
      shade: 'Warm',
      tone: 'Medium',
      dimensions: {
        length: '1224mm',
        width: '190mm',
        thickness: '5.0mm'
      },
      wearLayer: {
        species: 'Vinyl',
        thickness: '20 mil / 0.5mm'
      },
      finish: 'Enhanced Stability',
      warranty: 'Lifetime Residential',
      bevel: 'I4F Locking System',
      plySpecies: 'Vinyl Composite',
      package: {
        m2PerBox: '2.3256',
        sqftPerBox: '25.04',
        boxPerSkid: '35'
      },
      images: [Bolero_1, Bolero_2, Bolero_3],
      inStock: true,
      rating: 4.1
    },
    // Leather | Luxury LooseLay Vinyl
    {
      id: 'FLL6002',
      name: 'FLL6002 | Leather',
      category: 'luxury-loose-lay',
      thickness: ['5mm'],
      color: 'Leather',
      shade: 'Warm',
      tone: 'Medium',
      dimensions: {
        length: '1224mm',
        width: '190mm',
        thickness: '5.0mm'
      },
      wearLayer: {
        species: 'Vinyl',
        thickness: '20 mil / 0.5mm'
      },
      finish: 'Enhanced Stability',
      warranty: 'Lifetime Residential',
      bevel: 'I4F Locking System',
      plySpecies: 'Vinyl Composite',
      package: {
        m2PerBox: '2.3256',
        sqftPerBox: '25.04',
        boxPerSkid: '35'
      },
      images: [Leather_1, Leather_2, Leather_3],
      inStock: true,
      rating: 4.0
    },
    // Eclipse | Luxury LooseLay Vinyl
    {
      id: 'FLL6001',
      name: 'FLL6001 | Eclipse',
      category: 'luxury-loose-lay',
      thickness: ['5mm'],
      color: 'Eclipse',
      shade: 'Cool',
      tone: 'Dark',
      dimensions: {
        length: '1224mm',
        width: '190mm',
        thickness: '5.0mm'
      },
      wearLayer: {
        species: 'Vinyl',
        thickness: '20 mil / 0.5mm'
      },
      finish: 'Enhanced Stability',
      warranty: 'Lifetime Residential',
      bevel: 'I4F Locking System',
      plySpecies: 'Vinyl Composite',
      package: {
        m2PerBox: '2.3256',
        sqftPerBox: '25.04',
        boxPerSkid: '35'
      },
      images: [Eclipse_1, Eclipse_2, Eclipse_3],
      inStock: true,
      rating: 3.9
    },
    // Ranch | Home Luxury Vinyl 55
    {
      id: 'FLS1012',
      name: 'FLS1012 | Ranch',
      category: 'luxury-vinyl',
      thickness: ['55mil'],
      color: 'Ranch',
      shade: 'Neutral',
      tone: 'Medium',
      dimensions: {
        length: '1220mm',
        width: '183mm',
        thickness: '5.5mm (4.0 +1.5 IXPE)'
      },
      wearLayer: {
        species: 'Vinyl',
        thickness: '12 mil'
      },
      finish: 'Upgraded IXPE Pad Attached',
      warranty: 'Lifetime Residential',
      bevel: 'Enhanced Stability',
      plySpecies: 'Vinyl Composite',
      package: {
        m2PerBox: '2.2316',
        sqftPerBox: '24.04',
        boxPerSkid: '60'
      },
      images: [Ranch_1, Ranch_2, Ranch_3],
      inStock: true,
      rating: 4.8
    },
    // Ivory | Home Luxury Vinyl 55
    {
      id: 'FLS1011',
      name: 'FLS1011 | Ivory',
      category: 'luxury-vinyl',
      thickness: ['55mil'],
      color: 'Ivory',
      shade: 'Cool',
      tone: 'Light',
      dimensions: {
        length: '1220mm',
        width: '183mm',
        thickness: '5.5mm (4.0 +1.5 IXPE)'
      },
      wearLayer: {
        species: 'Vinyl',
        thickness: '12 mil'
      },
      finish: 'Upgraded IXPE Pad Attached',
      warranty: 'Lifetime Residential',
      bevel: 'Enhanced Stability',
      plySpecies: 'Vinyl Composite',
      package: {
        m2PerBox: '2.2316',
        sqftPerBox: '24.04',
        boxPerSkid: '60'
      },
      images: [Ivory_1, Ivory_2, Ivory_3],
      inStock: true,
      rating: 4.7
    },
    // Nutmeg | Home Luxury Vinyl 55
    {
      id: 'FLS1010',
      name: 'FLS1010 | Nutmeg',
      category: 'luxury-vinyl',
      thickness: ['55mil'],
      color: 'Nutmeg',
      shade: 'Warm',
      tone: 'Medium',
      dimensions: {
        length: '1220mm',
        width: '183mm',
        thickness: '5.5mm (4.0 +1.5 IXPE)'
      },
      wearLayer: {
        species: 'Vinyl',
        thickness: '12 mil'
      },
      finish: 'Upgraded IXPE Pad Attached',
      warranty: 'Lifetime Residential',
      bevel: 'Enhanced Stability',
      plySpecies: 'Vinyl Composite',
      package: {
        m2PerBox: '2.2316',
        sqftPerBox: '24.04',
        boxPerSkid: '60'
      },
      images: [Nutmeg_1, Nutmeg_2, Nutmeg_3],
      inStock: true,
      rating: 4.6
    },
    // Shade of Grey | Home Luxury Vinyl 55
    {
      id: 'FLS1009',
      name: 'FLS1009 | Shade of Grey',
      category: 'luxury-vinyl',
      thickness: ['55mil'],
      color: 'Shade of Grey',
      shade: 'Cool',
      tone: 'Medium',
      dimensions: {
        length: '1220mm',
        width: '183mm',
        thickness: '5.5mm (4.0 +1.5 IXPE)'
      },
      wearLayer: {
        species: 'Vinyl',
        thickness: '12 mil'
      },
      finish: 'Upgraded IXPE Pad Attached',
      warranty: 'Lifetime Residential',
      bevel: 'Enhanced Stability',
      plySpecies: 'Vinyl Composite',
      package: {
        m2PerBox: '2.2316',
        sqftPerBox: '24.04',
        boxPerSkid: '60'
      },
      images: [ShadeOfGrey_1, ShadeOfGrey_2, ShadeOfGrey_3],
      inStock: true,
      rating: 4.5
    },
    // Milk Chocolate | Home Luxury Vinyl 55
    {
      id: 'FLS1008',
      name: 'FLS1008 | Milk Chocolate',
      category: 'luxury-vinyl',
      thickness: ['55mil'],
      color: 'Milk Chocolate',
      shade: 'Warm',
      tone: 'Medium',
      dimensions: {
        length: '1220mm',
        width: '183mm',
        thickness: '5.5mm (4.0 +1.5 IXPE)'
      },
      wearLayer: {
        species: 'Vinyl',
        thickness: '12 mil'
      },
      finish: 'Upgraded IXPE Pad Attached',
      warranty: 'Lifetime Residential',
      bevel: 'Enhanced Stability',
      plySpecies: 'Vinyl Composite',
      package: {
        m2PerBox: '2.2316',
        sqftPerBox: '24.04',
        boxPerSkid: '60'
      },
      images: [MilkChocolate_1, MilkChocolate_2, MilkChocolate_3],
      inStock: true,
      rating: 4.4
    },
    // Midnight | Home Luxury Vinyl 55
    {
      id: 'FLS1007',
      name: 'FLS1007 | Midnight',
      category: 'luxury-vinyl',
      thickness: ['55mil'],
      color: 'Midnight',
      shade: 'Cool',
      tone: 'Dark',
      dimensions: {
        length: '1220mm',
        width: '183mm',
        thickness: '5.5mm (4.0 +1.5 IXPE)'
      },
      wearLayer: {
        species: 'Vinyl',
        thickness: '12 mil'
      },
      finish: 'Upgraded IXPE Pad Attached',
      warranty: 'Lifetime Residential',
      bevel: 'Enhanced Stability',
      plySpecies: 'Vinyl Composite',
      package: {
        m2PerBox: '2.2316',
        sqftPerBox: '24.04',
        boxPerSkid: '60'
      },
      images: [Midnight_1, Midnight_2, Midnight_3],
      inStock: true,
      rating: 4.3
    },
    // Iceberg | Home Luxury Vinyl 55
    {
      id: 'FLS1006',
      name: 'FLS1006 | Iceberg',
      category: 'luxury-vinyl',
      thickness: ['55mil'],
      color: 'Iceberg',
      shade: 'Cool',
      tone: 'Light',
      dimensions: {
        length: '1220mm',
        width: '183mm',
        thickness: '5.5mm (4.0 +1.5 IXPE)'
      },
      wearLayer: {
        species: 'Vinyl',
        thickness: '12 mil'
      },
      finish: 'Upgraded IXPE Pad Attached',
      warranty: 'Lifetime Residential',
      bevel: 'Enhanced Stability',
      plySpecies: 'Vinyl Composite',
      package: {
        m2PerBox: '2.2316',
        sqftPerBox: '24.04',
        boxPerSkid: '60'
      },
      images: [Iceberg_1, Iceberg_2, Iceberg_3],
      inStock: true,
      rating: 4.2
    },
    // Tempest | Home Luxury Vinyl 55
    {
      id: 'FLS1005',
      name: 'FLS1005 | Tempest',
      category: 'luxury-vinyl',
      thickness: ['55mil'],
      color: 'Tempest',
      shade: 'Neutral',
      tone: 'Medium',
      dimensions: {
        length: '1220mm',
        width: '183mm',
        thickness: '5.5mm (4.0 +1.5 IXPE)'
      },
      wearLayer: {
        species: 'Vinyl',
        thickness: '12 mil'
      },
      finish: 'Upgraded IXPE Pad Attached',
      warranty: 'Lifetime Residential',
      bevel: 'Enhanced Stability',
      plySpecies: 'Vinyl Composite',
      package: {
        m2PerBox: '2.2316',
        sqftPerBox: '24.04',
        boxPerSkid: '60'
      },
      images: [Tempest_1, Tempest_2, Tempest_3],
      inStock: true,
      rating: 4.1
    },
    // Eclectic | Home Luxury Vinyl 55
    {
      id: 'FLS1004',
      name: 'FLS1004 | Eclectic',
      category: 'luxury-vinyl',
      thickness: ['55mil'],
      color: 'Eclectic',
      shade: 'Neutral',
      tone: 'Medium',
      dimensions: {
        length: '1220mm',
        width: '183mm',
        thickness: '5.5mm (4.0 +1.5 IXPE)'
      },
      wearLayer: {
        species: 'Vinyl',
        thickness: '12 mil'
      },
      finish: 'Upgraded IXPE Pad Attached',
      warranty: 'Lifetime Residential',
      bevel: 'Enhanced Stability',
      plySpecies: 'Vinyl Composite',
      package: {
        m2PerBox: '2.2316',
        sqftPerBox: '24.04',
        boxPerSkid: '60'
      },
      images: [Eclectic_1, Eclectic_2, Eclectic_3],
      inStock: true,
      rating: 4.0
    },
    // Slate | Home Luxury Vinyl 55
    {
      id: 'FLS1002',
      name: 'FLS1002 | Slate',
      category: 'luxury-vinyl',
      thickness: ['55mil'],
      color: 'Slate',
      shade: 'Cool',
      tone: 'Medium',
      dimensions: {
        length: '1220mm',
        width: '183mm',
        thickness: '5.5mm (4.0 +1.5 IXPE)'
      },
      wearLayer: {
        species: 'Vinyl',
        thickness: '12 mil'
      },
      finish: 'Upgraded IXPE Pad Attached',
      warranty: 'Lifetime Residential',
      bevel: 'Enhanced Stability',
      plySpecies: 'Vinyl Composite',
      package: {
        m2PerBox: '2.2316',
        sqftPerBox: '24.04',
        boxPerSkid: '60'
      },
      images: [Slate_1, Slate_2, Slate_3],
      inStock: true,
      rating: 3.9
    },
    // Blizzard | Home Luxury Vinyl 55
    {
      id: 'FLS1001',
      name: 'FLS1001 | Blizzard',
      category: 'luxury-vinyl',
      thickness: ['55mil'],
      color: 'Blizzard',
      shade: 'Cool',
      tone: 'Light',
      dimensions: {
        length: '1220mm',
        width: '183mm',
        thickness: '5.5mm (4.0 +1.5 IXPE)'
      },
      wearLayer: {
        species: 'Vinyl',
        thickness: '12 mil'
      },
      finish: 'Upgraded IXPE Pad Attached',
      warranty: 'Lifetime Residential',
      bevel: 'Enhanced Stability',
      plySpecies: 'Vinyl Composite',
      package: {
        m2PerBox: '2.2316',
        sqftPerBox: '24.04',
        boxPerSkid: '60'
      },
      images: [Blizzard_1, Blizzard_2, Blizzard_3],
      inStock: true,
      rating: 3.8
    },
    // Bandsawn Grey | Home Luxury Vinyl 55
    {
      id: 'FLS1003',
      name: 'FLS1003 | Bandsawn Grey',
      category: 'luxury-vinyl',
      thickness: ['55mil'],
      color: 'Bandsawn Grey',
      shade: 'Cool',
      tone: 'Medium',
      dimensions: {
        length: '1220mm',
        width: '183mm',
        thickness: '5.5mm (4.0 +1.5 IXPE)'
      },
      wearLayer: {
        species: 'Vinyl',
        thickness: '12 mil'
      },
      finish: 'Upgraded IXPE Pad Attached',
      warranty: 'Lifetime Residential',
      bevel: 'Enhanced Stability',
      plySpecies: 'Vinyl Composite',
      package: {
        m2PerBox: '2.2316',
        sqftPerBox: '24.04',
        boxPerSkid: '60'
      },
      images: [BandsawnGrey_1, BandsawnGrey_2, BandsawnGrey_3],
      inStock: true,
      rating: 3.7
    },
    // FLS2010 | Frozen
    {
      id: 'FLS2010',
      name: 'FLS2010 | Frozen',
      category: 'luxury-vinyl',
      thickness: ['65mil'],
      color: 'Frozen',
      shade: 'Cool',
      tone: 'Light',
      dimensions: {
        length: '1220mm',
        width: '183mm',
        thickness: '6.5mm'
      },
      wearLayer: {
        species: 'Luxury Vinyl',
        thickness: '20 mil'
      },
      finish: 'Waterproof, Commercial Wear',
      warranty: 'Lifetime Residential',
      bevel: '4 Sided Micro-Bevel',
      plySpecies: 'IXPE Attached',
      package: {
        m2PerBox: '2.207',
        sqftPerBox: '24.04',
        boxPerSkid: '50'
      },
      images: [Frozen_1, Frozen_2, Frozen_3],
      inStock: true,
      rating: 4.9
    },
    // FLS2009 | Bone Grey
    {
      id: 'FLS2009',
      name: 'FLS2009 | Bone Grey',
      category: 'luxury-vinyl',
      thickness: ['65mil'],
      color: 'Bone Grey',
      shade: 'Neutral',
      tone: 'Medium',
      dimensions: {
        length: '1220mm',
        width: '183mm',
        thickness: '6.5mm'
      },
      wearLayer: {
        species: 'Luxury Vinyl',
        thickness: '20 mil'
      },
      finish: 'Waterproof, Commercial Wear',
      warranty: 'Lifetime Residential',
      bevel: '4 Sided Micro-Bevel',
      plySpecies: 'IXPE Attached',
      package: {
        m2PerBox: '2.207',
        sqftPerBox: '24.04',
        boxPerSkid: '50'
      },
      images: [BoneGrey_1, BoneGrey_2, BoneGrey_3],
      inStock: true,
      rating: 4.8
    },
    // FLS2008 | Antique Brown
    {
      id: 'FLS2008',
      name: 'FLS2008 | Antique Brown',
      category: 'luxury-vinyl',
      thickness: ['65mil'],
      color: 'Antique Brown',
      shade: 'Warm',
      tone: 'Medium',
      dimensions: {
        length: '1220mm',
        width: '183mm',
        thickness: '6.5mm'
      },
      wearLayer: {
        species: 'Luxury Vinyl',
        thickness: '20 mil'
      },
      finish: 'Waterproof, Commercial Wear',
      warranty: 'Lifetime Residential',
      bevel: '4 Sided Micro-Bevel',
      plySpecies: 'IXPE Attached',
      package: {
        m2PerBox: '2.207',
        sqftPerBox: '24.04',
        boxPerSkid: '50'
      },
      images: [AntiqueBrown_1, AntiqueBrown_2, AntiqueBrown_3],
      inStock: true,
      rating: 4.7
    },
    // FLS2007 | Misty
    {
      id: 'FLS2007',
      name: 'FLS2007 | Misty',
      category: 'luxury-vinyl',
      thickness: ['65mil'],
      color: 'Misty',
      shade: 'Cool',
      tone: 'Light',
      dimensions: {
        length: '1220mm',
        width: '183mm',
        thickness: '6.5mm'
      },
      wearLayer: {
        species: 'Luxury Vinyl',
        thickness: '20 mil'
      },
      finish: 'Waterproof, Commercial Wear',
      warranty: 'Lifetime Residential',
      bevel: '4 Sided Micro-Bevel',
      plySpecies: 'IXPE Attached',
      package: {
        m2PerBox: '2.207',
        sqftPerBox: '24.04',
        boxPerSkid: '50'
      },
      images: [Misty_1, Misty_2, Misty_3],
      inStock: true,
      rating: 4.6
    },
    // FLS2006 | Osso
    {
      id: 'FLS2006',
      name: 'FLS2006 | Osso',
      category: 'luxury-vinyl',
      thickness: ['65mil'],
      color: 'Osso',
      shade: 'Neutral',
      tone: 'Light',
      dimensions: {
        length: '1220mm',
        width: '183mm',
        thickness: '6.5mm'
      },
      wearLayer: {
        species: 'Luxury Vinyl',
        thickness: '20 mil'
      },
      finish: 'Waterproof, Commercial Wear',
      warranty: 'Lifetime Residential',
      bevel: '4 Sided Micro-Bevel',
      plySpecies: 'IXPE Attached',
      package: {
        m2PerBox: '2.207',
        sqftPerBox: '24.04',
        boxPerSkid: '50'
      },
      images: [Osso_1, Osso_2, Osso_3],
      inStock: true,
      rating: 4.5
    },
    // FLS2005 | Cathedral Grey
    {
      id: 'FLS2005',
      name: 'FLS2005 | Cathedral Grey',
      category: 'luxury-vinyl',
      thickness: ['65mil'],
      color: 'Cathedral Grey',
      shade: 'Cool',
      tone: 'Dark',
      dimensions: {
        length: '1220mm',
        width: '183mm',
        thickness: '6.5mm'
      },
      wearLayer: {
        species: 'Luxury Vinyl',
        thickness: '20 mil'
      },
      finish: 'Waterproof, Commercial Wear',
      warranty: 'Lifetime Residential',
      bevel: '4 Sided Micro-Bevel',
      plySpecies: 'IXPE Attached',
      package: {
        m2PerBox: '2.207',
        sqftPerBox: '24.04',
        boxPerSkid: '50'
      },
      images: [CathedralGrey_1, CathedralGrey_2, CathedralGrey_3],
      inStock: true,
      rating: 4.4
    },
    // FLS2004 | Grey Walnut
    {
      id: 'FLS2004',
      name: 'FLS2004 | Grey Walnut',
      category: 'luxury-vinyl',
      thickness: ['65mil'],
      color: 'Grey Walnut',
      shade: 'Cool',
      tone: 'Medium',
      dimensions: {
        length: '1220mm',
        width: '183mm',
        thickness: '6.5mm'
      },
      wearLayer: {
        species: 'Luxury Vinyl',
        thickness: '20 mil'
      },
      finish: 'Waterproof, Commercial Wear',
      warranty: 'Lifetime Residential',
      bevel: '4 Sided Micro-Bevel',
      plySpecies: 'IXPE Attached',
      package: {
        m2PerBox: '2.207',
        sqftPerBox: '24.04',
        boxPerSkid: '50'
      },
      images: [GreyWalnut_1, GreyWalnut_2, GreyWalnut_3],
      inStock: true,
      rating: 4.3
    },
    // FLS2003 | Aged Oak
    {
      id: 'FLS2003',
      name: 'FLS2003 | Aged Oak',
      category: 'luxury-vinyl',
      thickness: ['65mil'],
      color: 'Aged Oak',
      shade: 'Warm',
      tone: 'Medium',
      dimensions: {
        length: '1220mm',
        width: '183mm',
        thickness: '6.5mm'
      },
      wearLayer: {
        species: 'Luxury Vinyl',
        thickness: '20 mil'
      },
      finish: 'Waterproof, Commercial Wear',
      warranty: 'Lifetime Residential',
      bevel: '4 Sided Micro-Bevel',
      plySpecies: 'IXPE Attached',
      package: {
        m2PerBox: '2.207',
        sqftPerBox: '24.04',
        boxPerSkid: '50'
      },
      images: [AgedOak_1, AgedOak_2, AgedOak_3],
      inStock: true,
      rating: 4.2
    },
    // FLS2002 | Night Sky
    {
      id: 'FLS2002',
      name: 'FLS2002 | Night Sky',
      category: 'luxury-vinyl',
      thickness: ['65mil'],
      color: 'Night Sky',
      shade: 'Cool',
      tone: 'Dark',
      dimensions: {
        length: '1220mm',
        width: '183mm',
        thickness: '6.5mm'
      },
      wearLayer: {
        species: 'Luxury Vinyl',
        thickness: '20 mil'
      },
      finish: 'Waterproof, Commercial Wear',
      warranty: 'Lifetime Residential',
      bevel: '4 Sided Micro-Bevel',
      plySpecies: 'IXPE Attached',
      package: {
        m2PerBox: '2.207',
        sqftPerBox: '24.04',
        boxPerSkid: '50'
      },
      images: [NightSky_1, NightSky_2, NightSky_3],
      inStock: true,
      rating: 4.1
    },
    // FLS2001 | Loft Grey
    {
      id: 'FLS2001',
      name: 'FLS2001 | Loft Grey',
      category: 'luxury-vinyl',
      thickness: ['65mil'],
      color: 'Loft Grey',
      shade: 'Cool',
      tone: 'Medium',
      dimensions: {
        length: '1220mm',
        width: '183mm',
        thickness: '6.5mm'
      },
      wearLayer: {
        species: 'Luxury Vinyl',
        thickness: '20 mil'
      },
      finish: 'Waterproof, Commercial Wear',
      warranty: 'Lifetime Residential',
      bevel: '4 Sided Micro-Bevel',
      plySpecies: 'IXPE Attached',
      package: {
        m2PerBox: '2.207',
        sqftPerBox: '24.04',
        boxPerSkid: '50'
      },
      images: [LoftGrey_1, LoftGrey_2, LoftGrey_3],
      inStock: true,
      rating: 4.0
    },
    // FLS2012 | Sahara
    {
      id: 'FLS2012',
      name: 'FLS2012 | Sahara',
      category: 'luxury-vinyl',
      thickness: ['65mil'],
      color: 'Sahara',
      shade: 'Warm',
      tone: 'Light',
      dimensions: {
        length: '1220mm',
        width: '183mm',
        thickness: '6.5mm'
      },
      wearLayer: {
        species: 'Luxury Vinyl',
        thickness: '20 mil'
      },
      finish: 'Waterproof, Commercial Wear',
      warranty: 'Lifetime Residential',
      bevel: '4 Sided Micro-Bevel',
      plySpecies: 'IXPE Attached',
      package: {
        m2PerBox: '2.207',
        sqftPerBox: '24.04',
        boxPerSkid: '50'
      },
      images: [Sahara_1, Sahara_2, Sahara_3],
      inStock: true,
      rating: 4.8
    },
    // FLS2011 | Café
    {
      id: 'FLS2011',
      name: 'FLS2011 | Café',
      category: 'luxury-vinyl',
      thickness: ['65mil'],
      color: 'Café',
      shade: 'Warm',
      tone: 'Medium',
      dimensions: {
        length: '1220mm',
        width: '183mm',
        thickness: '6.5mm'
      },
      wearLayer: {
        species: 'Luxury Vinyl',
        thickness: '20 mil'
      },
      finish: 'Waterproof, Commercial Wear',
      warranty: 'Lifetime Residential',
      bevel: '4 Sided Micro-Bevel',
      plySpecies: 'IXPE Attached',
      package: {
        m2PerBox: '2.207',
        sqftPerBox: '24.04',
        boxPerSkid: '50'
      },
      images: [Cafe_1, Cafe_2, Cafe_3],
      inStock: true,
      rating: 4.9
    },
    // TFL625 | Whistler Pine
    {
      id: 'TFL625',
      name: 'TFL625 | Whistler Pine',
      category: 'luxury-loose-lay',
      thickness: ['5mm'],
      color: 'TFSPC608',
      shade: 'Medium',
      tone: 'Warm',
      dimensions: {
        length: '1228mm',
        width: '188mm',
        thickness: '5mm'
      },
      wearLayer: {
        species: 'Real Antique Wood Texture',
        thickness: '20mil'
      },
      finish: '100% Waterproof, Extreme Scratch Resistance',
      warranty: '30 Years Residential, 10 Years Commercial',
      bevel: 'No Lock System',
      plySpecies: 'Loose Lay Vinyl',
      package: {
        m2PerBox: '0.231',
        sqftPerBox: '2.49',
        boxPerSkid: 'N/A'
      },
      images: [TFL625_WhistlerPine_1, TFL625_WhistlerPine_2, TFL625_WhistlerPine_3],
      inStock: true,
      rating: 4.8,
      link: '/products/flooring/tfl625'
    },
    // TFL602 | New York
    {
      id: 'TFL602',
      name: 'TFL602 | New York',
      category: 'luxury-loose-lay',
      thickness: ['5mm'],
      color: 'Black',
      shade: 'Dark',
      tone: 'Warm',
      dimensions: {
        length: '1224mm',
        width: '190mm',
        thickness: '5mm'
      },
      wearLayer: {
        species: 'Real Antique Wood Texture',
        thickness: '20mil'
      },
      finish: '100% Waterproof, Extreme Scratch Resistance',
      warranty: '30 Years Residential, 10 Years Commercial',
      bevel: 'No Lock System',
      plySpecies: 'Loose Lay Vinyl',
      package: {
        m2PerBox: '0.233',
        sqftPerBox: '2.51',
        boxPerSkid: 'N/A'
      },
      images: [TFL602_NewYork_1, TFL602_NewYork_2, TFL602_NewYork_3],
      inStock: true,
      rating: 4.7,
      link: '/products/flooring/tfl602'
    },
    // TFL605 | Stone Wood
    {
      id: 'TFL605',
      name: 'TFL605 | Stone Wood',
      category: 'luxury-loose-lay',
      thickness: ['5mm'],
      color: 'Grey',
      shade: 'Medium',
      tone: 'Warm',
      dimensions: {
        length: '1224mm',
        width: '190mm',
        thickness: '5mm'
      },
      wearLayer: {
        species: 'Real Antique Wood Texture',
        thickness: '20mil'
      },
      finish: '100% Waterproof, Extreme Scratch Resistance',
      warranty: '30 Years Residential, 10 Years Commercial',
      bevel: 'No Lock System',
      plySpecies: 'Loose Lay Vinyl',
      package: {
        m2PerBox: '0.233',
        sqftPerBox: '2.51',
        boxPerSkid: 'N/A'
      },
      images: [TFL605_StoneWood_1, TFL605_StoneWood_2, TFL605_StoneWood_3],
      inStock: true,
      rating: 4.6,
      link: '/products/flooring/tfl605'
    },
    // TFL604 | Chicago
    {
      id: 'TFL604',
      name: 'TFL604 | Chicago',
      category: 'luxury-loose-lay',
      thickness: ['5mm'],
      color: 'Grey',
      shade: 'Medium',
      tone: 'Cool',
      dimensions: {
        length: '1224mm',
        width: '190mm',
        thickness: '5mm'
      },
      wearLayer: {
        species: 'Real Antique Wood Texture',
        thickness: '20mil'
      },
      finish: '100% Waterproof, Extreme Scratch Resistance',
      warranty: '30 Years Residential, 10 Years Commercial',
      bevel: 'No Lock System',
      plySpecies: 'Loose Lay Vinyl',
      package: {
        m2PerBox: '0.233',
        sqftPerBox: '2.51',
        boxPerSkid: 'N/A'
      },
      images: [TFL604_Chicago_1, TFL604_Chicago_2, TFL604_Chicago_3],
      inStock: true,
      rating: 4.5,
      link: '/products/flooring/tfl604'
    },
    // TFL627 | Honey Birch
    {
      id: 'TFL627',
      name: 'TFL627 | Honey Birch',
      category: 'luxury-loose-lay',
      thickness: ['5mm'],
      color: 'TFSPC610',
      shade: 'Medium',
      tone: 'Warm',
      dimensions: {
        length: '1228mm',
        width: '188mm',
        thickness: '5mm'
      },
      wearLayer: {
        species: 'Real Antique Wood Texture',
        thickness: '20mil'
      },
      finish: '100% Waterproof, Extreme Scratch Resistance',
      warranty: '30 Years Residential, 10 Years Commercial',
      bevel: 'No Lock System',
      plySpecies: 'Loose Lay Vinyl',
      package: {
        m2PerBox: '0.231',
        sqftPerBox: '2.49',
        boxPerSkid: 'N/A'
      },
      images: [TFL627_HoneyBirch_1, TFL627_HoneyBirch_2, TFL627_HoneyBirch_3],
      inStock: true,
      rating: 4.4,
      link: '/products/flooring/tfl627'
    },
    // TFL628 | Hudson Sand
    {
      id: 'TFL628',
      name: 'TFL628 | Hudson Sand',
      category: 'luxury-loose-lay',
      thickness: ['5mm'],
      color: 'Beige & Tan',
      shade: 'Light',
      tone: 'Warm',
      dimensions: {
        length: '1228mm',
        width: '188mm',
        thickness: '5mm'
      },
      wearLayer: {
        species: 'Real Antique Wood Texture',
        thickness: '20mil'
      },
      finish: '100% Waterproof, Extreme Scratch Resistance',
      warranty: '30 Years Residential, 10 Years Commercial',
      bevel: 'No Lock System',
      plySpecies: 'Loose Lay Vinyl',
      package: {
        m2PerBox: '0.231',
        sqftPerBox: '2.49',
        boxPerSkid: 'N/A'
      },
      images: [TFL628_HudsonSand_1, TFL628_HudsonSand_2, TFL628_HudsonSand_3],
      inStock: true,
      rating: 4.3,
      link: '/products/flooring/tfl628'
    },
    // TFL610 | City Loft
    {
      id: 'TFL610',
      name: 'TFL610 | City Loft',
      category: 'luxury-loose-lay',
      thickness: ['5mm'],
      color: 'Nature',
      shade: 'Light',
      tone: 'Warm',
      dimensions: {
        length: '1224mm',
        width: '190mm',
        thickness: '5mm'
      },
      wearLayer: {
        species: 'Real Antique Wood Texture',
        thickness: '20mil'
      },
      finish: '100% Waterproof, Extreme Scratch Resistance',
      warranty: '30 Years Residential, 10 Years Commercial',
      bevel: 'No Lock System',
      plySpecies: 'Loose Lay Vinyl',
      package: {
        m2PerBox: '0.233',
        sqftPerBox: '2.51',
        boxPerSkid: 'N/A'
      },
      images: [TFL610_CityLoft_1, TFL610_CityLoft_2, TFL610_CityLoft_3],
      inStock: true,
      rating: 4.2,
      link: '/products/flooring/tfl610'
    },
    // TFL607 | Dynamic Grey
    {
      id: 'TFL607',
      name: 'TFL607 | Dynamic Grey',
      category: 'luxury-loose-lay',
      thickness: ['5mm'],
      color: 'Grey',
      shade: 'Light',
      tone: 'Cool',
      dimensions: {
        length: '1224mm',
        width: '190mm',
        thickness: '5mm'
      },
      wearLayer: {
        species: 'Real Antique Wood Texture',
        thickness: '20mil'
      },
      finish: '100% Waterproof, Extreme Scratch Resistance',
      warranty: '30 Years Residential, 10 Years Commercial',
      bevel: 'No Lock System',
      plySpecies: 'Loose Lay Vinyl',
      package: {
        m2PerBox: '0.233',
        sqftPerBox: '2.51',
        boxPerSkid: 'N/A'
      },
      images: [TFL607_DynamicGrey_1, TFL607_DynamicGrey_2, TFL607_DynamicGrey_3],
      inStock: true,
      rating: 4.1,
      link: '/products/flooring/tfl607'
    },
    // TFL622 | Chestnut Canyon
    {
      id: 'TFL622',
      name: 'TFL622 | Chestnut Canyon',
      category: 'luxury-loose-lay',
      thickness: ['5mm'],
      color: 'TFSPC261',
      shade: 'Medium',
      tone: 'Warm',
      dimensions: {
        length: '1228mm',
        width: '188mm',
        thickness: '5mm'
      },
      wearLayer: {
        species: 'Real Antique Wood Texture',
        thickness: '20mil'
      },
      finish: '100% Waterproof, Extreme Scratch Resistance',
      warranty: '30 Years Residential, 10 Years Commercial',
      bevel: 'No Lock System',
      plySpecies: 'Loose Lay Vinyl',
      package: {
        m2PerBox: '0.231',
        sqftPerBox: '2.49',
        boxPerSkid: 'N/A'
      },
      images: [TFL622_ChestnutCanyon_1, TFL622_ChestnutCanyon_2, TFL622_ChestnutCanyon_3],
      inStock: true,
      rating: 4.0,
      link: '/products/flooring/tfl622'
    },
    // TFL626 | Prairie Wheat
    {
      id: 'TFL626',
      name: 'TFL626 | Prairie Wheat',
      category: 'luxury-loose-lay',
      thickness: ['5mm'],
      color: 'Nature',
      shade: 'Light',
      tone: 'Warm',
      dimensions: {
        length: '1228mm',
        width: '188mm',
        thickness: '5mm'
      },
      wearLayer: {
        species: 'Real Antique Wood Texture',
        thickness: '20mil'
      },
      finish: '100% Waterproof, Extreme Scratch Resistance',
      warranty: '30 Years Residential, 10 Years Commercial',
      bevel: 'No Lock System',
      plySpecies: 'Loose Lay Vinyl',
      package: {
        m2PerBox: '0.231',
        sqftPerBox: '2.49',
        boxPerSkid: 'N/A'
      },
      images: [TFL626_PrairieWheat_1, TFL626_PrairieWheat_2, TFL626_PrairieWheat_3],
      inStock: true,
      rating: 3.9,
      link: '/products/flooring/tfl626'
    },
    // TFL624 | Autumn Glow
    {
      id: 'TFL624',
      name: 'TFL624 | Autumn Glow',
      category: 'luxury-loose-lay',
      thickness: ['5mm'],
      color: 'TFSPC607',
      shade: 'Medium',
      tone: 'Warm',
      dimensions: {
        length: '1228mm',
        width: '188mm',
        thickness: '5mm'
      },
      wearLayer: {
        species: 'Real Antique Wood Texture',
        thickness: '20mil'
      },
      finish: '100% Waterproof, Extreme Scratch Resistance',
      warranty: '30 Years Residential, 10 Years Commercial',
      bevel: 'No Lock System',
      plySpecies: 'Loose Lay Vinyl',
      package: {
        m2PerBox: '0.231',
        sqftPerBox: '2.49',
        boxPerSkid: 'N/A'
      },
      images: [TFL624_AutumnGlow_1, TFL624_AutumnGlow_2, TFL624_AutumnGlow_3],
      inStock: true,
      rating: 3.8,
      link: '/products/flooring/tfl624'
    },
    // TFL623 | Northern Fog
    {
      id: 'TFL623',
      name: 'TFL623 | Northern Fog',
      category: 'luxury-loose-lay',
      thickness: ['5mm'],
      color: 'TFSPC605',
      shade: 'Medium',
      tone: 'Warm',
      dimensions: {
        length: '1228mm',
        width: '188mm',
        thickness: '5mm'
      },
      wearLayer: {
        species: 'Real Antique Wood Texture',
        thickness: '20mil'
      },
      finish: '100% Waterproof, Extreme Scratch Resistance',
      warranty: '30 Years Residential, 10 Years Commercial',
      bevel: 'No Lock System',
      plySpecies: 'Loose Lay Vinyl',
      package: {
        m2PerBox: '0.231',
        sqftPerBox: '2.49',
        boxPerSkid: 'N/A'
      },
      images: [TFL623_NorthernFog_1, TFL623_NorthernFog_2, TFL623_NorthernFog_3],
      inStock: true,
      rating: 3.7,
      link: '/products/flooring/tfl623'
    },
    // TFL608 | Sea Horizon
    {
      id: 'TFL608',
      name: 'TFL608 | Sea Horizon',
      category: 'luxury-loose-lay',
      thickness: ['5mm'],
      color: 'Grey',
      shade: 'Light',
      tone: 'Cool',
      dimensions: {
        length: '1224mm',
        width: '190mm',
        thickness: '5mm'
      },
      wearLayer: {
        species: 'Real Antique Wood Texture',
        thickness: '20mil'
      },
      finish: '100% Waterproof, Extreme Scratch Resistance',
      warranty: '30 Years Residential, 10 Years Commercial',
      bevel: 'No Lock System',
      plySpecies: 'Loose Lay Vinyl',
      package: {
        m2PerBox: '0.233',
        sqftPerBox: '2.51',
        boxPerSkid: 'N/A'
      },
      images: [TFL608_SeaHorizon_1, TFL608_SeaHorizon_2, TFL608_SeaHorizon_3],
      inStock: true,
      rating: 3.6,
      link: '/products/flooring/tfl608'
    },
    // TFL621 | Espresso Cedar
    {
      id: 'TFL621',
      name: 'TFL621 | Espresso Cedar',
      category: 'luxury-loose-lay',
      thickness: ['5mm'],
      color: 'Brown',
      shade: 'Dark',
      tone: 'Warm',
      dimensions: {
        length: '1228mm',
        width: '188mm',
        thickness: '5mm'
      },
      wearLayer: {
        species: 'Real Antique Wood Texture',
        thickness: '20mil'
      },
      finish: '100% Waterproof, Extreme Scratch Resistance',
      warranty: '30 Years Residential, 10 Years Commercial',
      bevel: 'No Lock System',
      plySpecies: 'Loose Lay Vinyl',
      package: {
        m2PerBox: '0.231',
        sqftPerBox: '2.49',
        boxPerSkid: 'N/A'
      },
      images: [TFL621_EspressoCedar_1, TFL621_EspressoCedar_2, TFL621_EspressoCedar_3],
      inStock: true,
      rating: 3.5,
      link: '/products/flooring/tfl621'
    },
    // TFL609 | Modern Grey
    {
      id: 'TFL609',
      name: 'TFL609 | Modern Grey',
      category: 'luxury-loose-lay',
      thickness: ['5mm'],
      color: 'Grey',
      shade: 'Light',
      tone: 'Cool',
      dimensions: {
        length: '1224mm',
        width: '190mm',
        thickness: '5mm'
      },
      wearLayer: {
        species: 'Real Antique Wood Texture',
        thickness: '20mil'
      },
      finish: '100% Waterproof, Extreme Scratch Resistance',
      warranty: '30 Years Residential, 10 Years Commercial',
      bevel: 'No Lock System',
      plySpecies: 'Loose Lay Vinyl',
      package: {
        m2PerBox: '0.233',
        sqftPerBox: '2.51',
        boxPerSkid: 'N/A'
      },
      images: [TFL609_ModernGrey_1, TFL609_ModernGrey_2, TFL609_ModernGrey_3],
      inStock: true,
      rating: 3.4,
      link: '/products/flooring/tfl609'
    },
    // TFSPC212-F | Rosewood
    {
      id: 'TFSPC212F',
      name: 'TFSPC212-F | Rosewood',
      category: 'luxury-loose-lay',
      thickness: ['6.5mm'],
      color: 'Brown',
      shade: 'Medium',
      tone: 'Warm',
      dimensions: {
        length: '1220mm',
        width: '183mm',
        thickness: '6.5mm',
        size: '1220 x 183 x 6.5 mm'
      },
      dimensionsInches: {
        length: '48.04"',
        width: '7.21"',
        thickness: '0.3"',
        size: '48.04 x 7.21 x 0.3 in'
      },
      surface: 'Real Antique Wood Texture',
      wearLayer: '20mil',
      waterResistance: '100% Waterproof',
      lockingSystem: 'Drop Lock',
      underpad: '1.5 mm Pad Attached',
      warranty: {
        residential: '30yrs',
        commercial: '10yrs'
      },
      recommendedRoom: 'LBKD',
      description: 'Our SPC2 6.5mm luxury vinyl plank flooring (LVP) offers enhanced durability, superior stability, and premium comfort. Designed for high-traffic areas, this collection is perfect for both residential and commercial applications, delivering a premium look and long-lasting performance.',
      link: '/products/flooring/tfspc212f',
      images: [TFSPC212F_Rosewood_1, TFSPC212F_Rosewood_2, TFSPC212F_Rosewood_3],
      inStock: true,
      rating: 4.9
    },
    // TFSPC211-F | London Fog
    {
      id: 'TFSPC211F',
      name: 'TFSPC211-F | London Fog',
      category: 'luxury-loose-lay',
      thickness: ['6.5mm'],
      color: 'Brown',
      shade: 'Medium',
      tone: 'Cool',
      dimensions: {
        length: '1220mm',
        width: '183mm',
        thickness: '6.5mm',
        size: '1220 x 183 x 6.5 mm'
      },
      dimensionsInches: {
        length: '48.04"',
        width: '7.21"',
        thickness: '0.3"',
        size: '48.04 x 7.21 x 0.3 in'
      },
      surface: 'Real Antique Wood Texture',
      wearLayer: '20mil',
      waterResistance: '100% Waterproof',
      lockingSystem: 'Drop Lock',
      underpad: '1.5 mm Pad Attached',
      warranty: {
        residential: '30yrs',
        commercial: '10yrs'
      },
      recommendedRoom: 'LBKD',
      description: 'Our SPC2 6.5mm luxury vinyl plank flooring (LVP) offers enhanced durability, superior stability, and premium comfort. Designed for high-traffic areas, this collection is perfect for both residential and commercial applications, delivering a premium look and long-lasting performance.',
      link: '/products/flooring/tfspc211f',
      images: [TFSPC211F_LondonFog_1, TFSPC211F_LondonFog_2, TFSPC211F_LondonFog_3],
      inStock: true,
      rating: 4.9
    },
    // TFSPC210-F | French Walnut
    {
      id: 'TFSPC210F',
      name: 'TFSPC210-F | French Walnut',
      category: 'luxury-loose-lay',
      thickness: ['6.5mm'],
      color: 'Grey',
      shade: 'Dark',
      tone: 'Cool',
      dimensions: {
        length: '1220mm',
        width: '183mm',
        thickness: '6.5mm',
        size: '1220 x 183 x 6.5 mm'
      },
      dimensionsInches: {
        length: '48.04"',
        width: '7.21"',
        thickness: '0.3"',
        size: '48.04 x 7.21 x 0.3 in'
      },
      surface: 'Real Antique Wood Texture',
      wearLayer: '20mil',
      waterResistance: '100% Waterproof',
      lockingSystem: 'Drop Lock',
      underpad: '1.5 mm Pad Attached',
      warranty: {
        residential: '30yrs',
        commercial: '10yrs'
      },
      recommendedRoom: 'LBKD',
      description: 'Our SPC2 6.5mm luxury vinyl plank flooring (LVP) offers enhanced durability, superior stability, and premium comfort. Designed for high-traffic areas, this collection is perfect for both residential and commercial applications, delivering a premium look and long-lasting performance.',
      link: '/products/flooring/tfspc210f',
      images: [TFSPC210F_FrenchWalnut_1, TFSPC210F_FrenchWalnut_2, TFSPC210F_FrenchWalnut_3],
      inStock: true,
      rating: 4.9
    },
    // TFSPC206-F | Grey Walnut
    {
      id: 'TFSPC206F',
      name: 'TFSPC206-F | Grey Walnut',
      category: 'luxury-loose-lay',
      thickness: ['6.5mm'],
      color: 'Grey',
      shade: 'Light',
      tone: 'Cool',
      dimensions: {
        length: '1220mm',
        width: '183mm',
        thickness: '6.5mm',
        size: '1220 x 183 x 6.5 mm'
      },
      dimensionsInches: {
        length: '48.04"',
        width: '7.21"',
        thickness: '0.3"',
        size: '48.04 x 7.21 x 0.3 in'
      },
      surface: 'Real Antique Wood Texture',
      wearLayer: '20mil',
      waterResistance: '100% Waterproof',
      lockingSystem: 'Drop Lock',
      underpad: '1.5 mm Pad Attached',
      warranty: {
        residential: '30yrs',
        commercial: '10yrs'
      },
      recommendedRoom: 'LBKD',
      description: 'Our SPC2 6.5mm luxury vinyl plank flooring (LVP) offers enhanced durability, superior stability, and premium comfort. Designed for high-traffic areas, this collection is perfect for both residential and commercial applications, delivering a premium look and long-lasting performance.',
      link: '/products/flooring/tfspc206f',
      images: [TFSPC206F_GreyWalnut_1, TFSPC206F_GreyWalnut_2, TFSPC206F_GreyWalnut_3],
      inStock: true,
      rating: 4.9
    },
    // TFSPC205-F | Copper
    {
      id: 'TFSPC205F',
      name: 'TFSPC205-F | Copper',
      category: 'luxury-loose-lay',
      thickness: ['6.5mm'],
      color: 'Brown',
      shade: 'Medium',
      tone: 'Warm',
      dimensions: {
        length: '1220mm',
        width: '183mm',
        thickness: '6.5mm',
        size: '1220 x 183 x 6.5 mm'
      },
      dimensionsInches: {
        length: '48.04"',
        width: '7.21"',
        thickness: '0.3"',
        size: '48.04 x 7.21 x 0.3 in'
      },
      surface: 'Real Antique Wood Texture',
      wearLayer: '20mil',
      waterResistance: '100% Waterproof',
      lockingSystem: 'Drop Lock',
      underpad: '1.5 mm Pad Attached',
      warranty: {
        residential: '30yrs',
        commercial: '10yrs'
      },
      recommendedRoom: 'LBKD',
      description: 'Our SPC2 6.5mm luxury vinyl plank flooring (LVP) offers enhanced durability, superior stability, and premium comfort. Designed for high-traffic areas, this collection is perfect for both residential and commercial applications, delivering a premium look and long-lasting performance.',
      link: '/products/flooring/tfspc205f',
      images: [TFSPC205F_Copper_1, TFSPC205F_Copper_2, TFSPC205F_Copper_3],
      inStock: true,
      rating: 4.9
    },
    // TFSPC203-F | Cobalt Grey
    {
      id: 'TFSPC203F',
      name: 'TFSPC203-F | Cobalt Grey',
      category: 'luxury-loose-lay',
      thickness: ['6.5mm'],
      color: 'Grey',
      shade: 'Dark',
      tone: 'Cool',
      dimensions: {
        length: '1220mm',
        width: '183mm',
        thickness: '6.5mm',
        size: '1220 x 183 x 6.5 mm'
      },
      dimensionsInches: {
        length: '48.04"',
        width: '7.21"',
        thickness: '0.3"',
        size: '48.04 x 7.21 x 0.3 in'
      },
      surface: 'Real Antique Wood Texture',
      wearLayer: '20mil',
      waterResistance: '100% Waterproof',
      lockingSystem: 'Drop Lock',
      underpad: '1.5 mm Pad Attached',
      warranty: {
        residential: '30yrs',
        commercial: '10yrs'
      },
      recommendedRoom: 'LBKD',
      description: 'Our SPC2 6.5mm luxury vinyl plank flooring (LVP) offers enhanced durability, superior stability, and premium comfort. Designed for high-traffic areas, this collection is perfect for both residential and commercial applications, delivering a premium look and long-lasting performance.',
      link: '/products/flooring/tfspc203f',
      images: [TFSPC203F_CobaltGrey_1, TFSPC203F_CobaltGrey_2, TFSPC203F_CobaltGrey_3],
      inStock: true,
      rating: 4.9
    },
    // TFSPC202-F | Everest Grey
    {
      id: 'TFSPC202F',
      name: 'TFSPC202-F | Everest Grey',
      category: 'luxury-loose-lay',
      thickness: ['6.5mm'],
      color: 'Grey',
      shade: 'Medium',
      tone: 'Cool',
      dimensions: {
        length: '1220mm',
        width: '183mm',
        thickness: '6.5mm',
        size: '1220 x 183 x 6.5 mm'
      },
      dimensionsInches: {
        length: '48.04"',
        width: '7.21"',
        thickness: '0.3"',
        size: '48.04 x 7.21 x 0.3 in'
      },
      surface: 'Real Antique Wood Texture',
      wearLayer: '20mil',
      waterResistance: '100% Waterproof',
      lockingSystem: 'Drop Lock',
      underpad: '1.5 mm Pad Attached',
      warranty: {
        residential: '30yrs',
        commercial: '10yrs'
      },
      recommendedRoom: 'LBKD',
      description: 'Our SPC2 6.5mm luxury vinyl plank flooring (LVP) offers enhanced durability, superior stability, and premium comfort. Designed for high-traffic areas, this collection is perfect for both residential and commercial applications, delivering a premium look and long-lasting performance.',
      link: '/products/flooring/tfspc202f',
      images: [TFSPC202F_EverestGrey_1, TFSPC202F_EverestGrey_2, TFSPC202F_EverestGrey_3],
      inStock: true,
      rating: 4.9
    },
    // TFSPC201-F | Nickel Grey
    {
      id: 'TFSPC201F',
      name: 'TFSPC201-F | Nickel Grey',
      category: 'luxury-loose-lay',
      thickness: ['6.5mm'],
      color: 'Grey',
      shade: 'Dark',
      tone: 'Cool',
      dimensions: {
        length: '1220mm',
        width: '183mm',
        thickness: '6.5mm',
        size: '1220 x 183 x 6.5 mm'
      },
      dimensionsInches: {
        length: '48.04"',
        width: '7.21"',
        thickness: '0.3"',
        size: '48.04 x 7.21 x 0.3 in'
      },
      surface: 'Real Antique Wood Texture',
      wearLayer: '20mil',
      waterResistance: '100% Waterproof',
      lockingSystem: 'Drop Lock',
      underpad: '1.5 mm Pad Attached',
      warranty: {
        residential: '30yrs',
        commercial: '10yrs'
      },
      recommendedRoom: 'LBKD',
      description: 'Our SPC2 6.5mm luxury vinyl plank flooring (LVP) offers enhanced durability, superior stability, and premium comfort. Designed for high-traffic areas, this collection is perfect for both residential and commercial applications, delivering a premium look and long-lasting performance.',
      link: '/products/flooring/tfspc201f',
      images: [TFSPC201F_NickelGrey_1, TFSPC201F_NickelGrey_2, TFSPC201F_NickelGrey_3],
      inStock: true,
      rating: 4.9
    }
  ];

  // Merge imported products with hardcoded products (avoid duplicates by slug)
  const allFlooringProducts = useMemo(() => {
    const merged = [...importedFlooringProducts];
    const existingSlugs = new Set(importedFlooringProducts.map(p => p.slug));
    
    // Convert hardcoded products to Product format
    hardcodedProducts.forEach((product: any) => {
      const slug = product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
      if (!existingSlugs.has(slug)) {
        merged.push({
          id: product.id,
          slug,
          name: product.name,
          brand: 'TriForest Floors',
          category: 'Flooring',
          images: product.images || [],
          shortDescription: `${product.name} - ${product.color || ''}`,
          description: `${product.name} ${product.color ? `in ${product.color}` : ''} flooring option`,
          specs: product.dimensions ? [
            { label: 'Dimensions', value: `${product.dimensions.length} x ${product.dimensions.width} x ${product.dimensions.thickness}` },
            ...(product.wearLayer ? [{ label: 'Wear Layer', value: `${product.wearLayer.species} ${product.wearLayer.thickness}` }] : []),
            ...(product.finish ? [{ label: 'Finish', value: product.finish }] : []),
            ...(product.warranty ? [{ label: 'Warranty', value: product.warranty }] : [])
          ] : undefined,
          tags: [product.category, ...(product.thickness || [])],
          inStock: product.inStock
        });
      }
    });
    
    return merged;
  }, []);

  const getActiveFilterCount = () => {
    return Object.values(selectedFilters).reduce((total, filters) => total + filters.length, 0);
  };

  const filteredProducts = useMemo(() => {
    if (getActiveFilterCount() === 0) {
      return allFlooringProducts;
    }

    return allFlooringProducts.filter(product => {
      // Check category filter - look in tags or category field
      if (selectedFilters.category.length > 0) {
        const productCategory = product.category?.toLowerCase() || '';
        const hasMatchingCategory = selectedFilters.category.some(filter => 
          productCategory.includes(filter.toLowerCase()) || 
          product.tags?.some(tag => tag.toLowerCase().includes(filter.toLowerCase()))
        );
        if (!hasMatchingCategory) {
          return false;
        }
      }

      // Check thickness filter - look in tags
      if (selectedFilters.thickness.length > 0) {
        const hasMatchingThickness = selectedFilters.thickness.some(filter =>
          product.tags?.some(tag => tag.toLowerCase().includes(filter.toLowerCase()))
        );
        if (!hasMatchingThickness) {
          return false;
        }
      }

      return true;
    });
  }, [selectedFilters, allFlooringProducts]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Pagination handlers
  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedFilters]);

  const filterSections = [
    {
      id: 'category',
      title: 'Flooring Category',
      options: [
        { value: 'engineered-hardwood', label: 'Engineered Hardwood', count: 12 },
        { value: 'luxury-loose-lay', label: 'Luxury LooseLay', count: 10 },
        { value: 'luxury-vinyl', label: 'Luxury Vinyl', count: 26 }
      ]
    },
    {
      id: 'thickness',
      title: 'Thickness',
      options: [
        { value: '2mm', label: '2mm Engineered', count: 6 },
        { value: '3mm', label: '3mm Engineered', count: 6 },
        { value: '5mm', label: '5mm LooseLay Vinyl', count: 24 },
        { value: '6.5mm', label: '6.5mm SPC2 LVP', count: 8 },
        { value: '42mil', label: 'Loft Luxury Vinyl 42 mil', count: 1 },
        { value: '55mil', label: 'Home Luxury Vinyl 55 mil', count: 12 },
        { value: '65mil', label: 'Estate Luxury Vinyl 65 mil', count: 12 }
      ]
    }
  ];
  return (
    <div className="min-h-screen">
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes fade-in-up {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fade-in-up {
            animation: fade-in-up 0.8s ease-out forwards;
          }
        `
      }} />
      {/* Header Image Section */}
      <section className="relative overflow-hidden">
        <div className="w-full h-64 md:h-80 lg:h-96 relative">
          {/* Background Image with Animation */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-slate-900/40 to-slate-800/60"></div>
          <img
            src="/Images/products/flooring-images/SUNSET-GREY.jpg"
            alt="Premium Flooring Collection"
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
          />

          {/* Animated Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

          {/* Decorative Elements */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-amber-400/30 to-orange-500/30 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-16 h-16 bg-gradient-to-br from-stone-400/25 to-gray-500/25 rounded-lg rotate-45 blur-lg animate-bounce" style={{ animationDuration: '3s' }}></div>

          {/* Header Text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white z-10">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 drop-shadow-2xl animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
                Premium Flooring
              </h1>
              <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed drop-shadow-lg animate-fade-in-up" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
                Transform your space with our exquisite collection of luxury flooring solutions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'EB Garamond, serif' }}>
              Our Flooring Categories
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover our premium flooring collection, carefully curated for quality, durability, and timeless elegance
            </p>
        </div>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Filter Sidebar */}
          <div className="lg:w-1/4">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 sticky top-24">
                <div className="filter">
                  {/* Filter Sections */}
                  {filterSections.map((section) => (
                    <div key={section.id} className="filter__section">
                      {/* Section Header */}
                      <div className="filter__head">
                        <h3 className="filter__title">
                          {section.title}
                        </h3>
                      </div>

                      {/* Filter Options */}
                      <ul className="filter__items">
                        {section.options.map((option) => (
                          <li key={option.value} className="filter__item">
                            <label className="filter__label">
                              <input
                                type="checkbox"
                                checked={selectedFilters[section.id as keyof typeof selectedFilters]?.includes(option.value) || false}
                                onChange={() => toggleFilter(section.id as keyof typeof selectedFilters, option.value)}
                                className="filter__check"
                              />
                              <span className="filter__text">
                                {option.label}
                              </span>
                              <span className="filter__count">
                                {option.count}
                              </span>
                            </label>
                          </li>
                        ))}
                      </ul>
          </div>
                  ))}

                  {/* Clear All Button */}
                  {getActiveFilterCount() > 0 && (
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <button
                        onClick={clearAllFilters}
                        className="clear-button"
                      >
                        Clear All
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Main Content Area */}
          <div className="lg:w-3/4">
              <div className="space-y-8">
                {/* Results Header */}
                <div className="flex justify-between items-center">
                  <p className="text-gray-600">
                    {filteredProducts.length} flooring product{filteredProducts.length !== 1 ? 's' : ''} found
                    {getActiveFilterCount() > 0 && ` (filtered)`}
                    {filteredProducts.length > productsPerPage && (
                      <span className="ml-4 text-sm">
                        Page {currentPage} of {totalPages} •
                        Showing {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length}
                      </span>
                    )}
                  </p>
            </div>

                {/* Products Grid */}
                {currentProducts.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {currentProducts.map((product) => (
                        <Link
                          key={product.id}
                          to={`/products/flooring/${product.slug}`}
                          className="group bg-white border border-blue-800 overflow-hidden hover:bg-blue-50 transition-colors duration-300 cursor-pointer block"
                        >
                          {/* Product Image */}
                          <div className="relative h-64 overflow-hidden bg-gray-100">
                            <img
                              src={product.images[0]}
                              alt={`${product.name} - ${(product as any).color || 'Premium'} flooring`}
                              className="w-full h-full object-cover"
                            />

                            {/* In Stock Badge */}
                    {product.inStock && (
                              <div className="absolute top-3 left-3 bg-black text-white px-2 py-1 text-xs font-medium">
                        In Stock
                      </div>
                    )}


                  </div>
                  
                          {/* Product Info */}
                          <div className="p-4">
                            <div className="mb-2">
                              <h3 className="text-lg font-semibold text-gray-900" style={{ fontFamily: 'EB Garamond, serif' }}>
                                {product.name}
                              </h3>
                              <p className="text-sm text-gray-600">{(product as any).color || product.shortDescription}</p>
                    </div>
                    





                          </div>
                        </Link>
                      ))}
                    </div>
                    
                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="flex justify-center items-center space-x-1 mt-8">
                        {/* Previous Button */}
                        <button
                          onClick={goToPrevPage}
                          disabled={currentPage === 1}
                          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-200 ${
                            currentPage === 1
                              ? 'text-gray-400 cursor-not-allowed'
                              : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                          }`}
                          aria-label="Previous page"
                        >
                          ← Previous
                        </button>

                        {/* Page Numbers */}
                        <div className="flex space-x-0.5">
                          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                            // Show first page, last page, current page, and pages around current
                            const showPage =
                              page === 1 ||
                              page === totalPages ||
                              (page >= currentPage - 1 && page <= currentPage + 1);

                            if (!showPage && page === currentPage - 2) {
                              return (
                                <span key={page} className="px-2 py-1.5 text-xs text-gray-500">
                                  ...
                                </span>
                              );
                            }

                            if (!showPage && page === currentPage + 2) {
                              return null; // Skip duplicate ellipsis
                            }

                            if (!showPage) return null;

                            return (
                              <button
                                key={page}
                                onClick={() => goToPage(page)}
                                className={`px-2 py-1.5 text-xs font-medium rounded-md transition-colors duration-200 ${
                                  page === currentPage
                                    ? 'bg-black text-white'
                                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                                }`}
                                aria-label={`Go to page ${page}`}
                                aria-current={page === currentPage ? 'page' : undefined}
                              >
                                {page}
                              </button>
                            );
                          })}
                    </div>
                    
                        {/* Next Button */}
                        <button
                          onClick={goToNextPage}
                          disabled={currentPage === totalPages}
                          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-200 ${
                            currentPage === totalPages
                              ? 'text-gray-400 cursor-not-allowed'
                              : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                          }`}
                          aria-label="Next page"
                        >
                          Next →
                    </button>
                  </div>
                    )}
                  </>
                ) : (
                  <div className="min-h-[400px] flex items-center justify-center">
                    <div className="text-center space-y-6">
                      <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                </div>
                <div>
                        <h3 className="minimalist-heading">No Products Found</h3>
                        <p className="minimalist-subtitle max-w-md">
                          Try adjusting your filters to discover our flooring collections.
                        </p>
                </div>
                      <button onClick={clearAllFilters} className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                        Clear All Filters
                      </button>
                </div>
                </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flooring;