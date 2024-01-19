import React from "react";
import UserSection from "@/components/user-section";
import Stats from "@/components/stats";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TopArtists = () => {
  return (
    <div>
      <UserSection label="Top Artists" />
      <Tabs defaultValue="long_term" className="mt-4">
        <TabsList className="w-full border border-black/10 dark:border-white/10 md:w-1/2">
          <TabsTrigger value="short_term">Last month</TabsTrigger>
          <TabsTrigger value="medium_term">Last 6 months</TabsTrigger>
          <TabsTrigger value="long_term">All time</TabsTrigger>
        </TabsList>
        <TabsContent value="short_term">
          <Stats type="artists" timeframe="short_term" />
        </TabsContent>
        <TabsContent value="medium_term">
          <Stats type="artists" timeframe="medium_term" />
        </TabsContent>
        <TabsContent value="long_term">
          <Stats type="artists" timeframe="long_term" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TopArtists;
