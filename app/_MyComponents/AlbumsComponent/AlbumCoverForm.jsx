'use client';

import { DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { SubmitButton } from '../SearchComponents/LeaveDialog';
import CoverPicker from './CoverPicker';



const AlbumCoverForm = ({ selected, setSelected }) => {


  return (
    <>
      <CoverPicker selected={selected} setSelected={setSelected} />
      <div className="relative flex items-center my-4">
        <div className="flex-grow border-t " />
        <span className="mx-4 text-xs text-muted-foreground">Or</span>
        <div className="flex-grow border-t " />
      </div>

      <div className="py-2">
        <Input
          name="photo"
          type="file"
          accept="image/*"
          className="mx-auto mt-4 w-full px-0 py-0 border rounded-md bg-muted text-muted-foreground
                     file:px-4 file:py-2 file:rounded-none file:border-none file:bg-accent 
                     file:text-accent-foreground file:m-0 file:mr-4 file:rounded-l-md file:shadow-none"
        />

      </div>



      <DialogFooter>
        <SubmitButton buttonText="Done" />
      </DialogFooter>
    </>
  );
};

export default AlbumCoverForm;
