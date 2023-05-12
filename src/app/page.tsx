import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='text-lg py-6'>Create your room</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle className='text-xl'>Create your room</DialogTitle>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-1 items-center gap-4'>
            <Label htmlFor='name'>Room Name</Label>
            <Input id='name' value='' className='col-span-3' />
          </div>
        </div>
        <DialogFooter>
          <Button type='submit'>Create room</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function Home() {
  return (
    <div className='px-6 py-24 sm:px-6 sm:py-32 lg:px-8'>
      <div className='mx-auto max-w-2xl text-center'>
        <h1 className='text-4xl font-bold tracking-tight text-gray-800 sm:text-4xl'>
          Start your scrum poker now.
        </h1>
        <p className='mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-800 mb-6'>
          Incididunt sint fugiat pariatur cupidatat consectetur sit cillum anim
          id veniam aliqua proident excepteur commodo do ea.
        </p>
        <DialogDemo />
      </div>
    </div>
  );
}
