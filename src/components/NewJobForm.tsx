"use client";

import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import ButtonLoading from "./ButtonLoading";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LocationInput from "./LocationInput";
import { Loader2Icon, X } from "lucide-react";
import { Label } from "./ui/label";
import { draftToMarkdown } from "markdown-draft-js";
import { jobTypes, locationTypes } from "@/app/jobs/schemas/job.types";
import { Select } from "./ui/Select";
import { newJobSchema, newJobType } from "@/app/jobs/schemas/job.schema";
import { createNewJob } from "@/app/jobs/actions/createJob.action";
import RichTextEditor from "./RichTextEditor";
import { Button } from "./ui/button";

const NewJobForm = () => {
  const form = useForm<newJobType>({
    resolver: zodResolver(newJobSchema),
  });

  const isSubmitting = form.formState.isSubmitting;

  const onSubmit = async (values: newJobType) => {
    const data = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        data.append(key, value);
      }
    });
    try {
      await createNewJob(data);
    } catch (error) {
      alert("Something went wrong, please try again.");
    }
  };
  return (
    <main className="m-auto my-10 max-w-3xl space-y-10">
      <div className="space-y-5 text-center">
        <h1>Find your perfect developer</h1>
        <p className="text-muted-foreground">
          Get your job posting seen by thousands of job seekers.
        </p>
      </div>
      <div className="space-y-6 rounded-lg border p-4">
        <div>
          <h2 className="font-semibold">Job details</h2>
          <p className="text-muted-foreground">
            Provide a job description and details
          </p>
        </div>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job title</FormLabel>
                  <FormControl>
                    <Input {...field}></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job type</FormLabel>
                  <FormControl>
                    <Select {...field} defaultValue="">
                      <option value="" hidden>
                        Select an option
                      </option>
                      {jobTypes?.map((type) => (
                        <option value={type} key={type}>
                          {type}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company name</FormLabel>
                  <FormControl>
                    <Input {...field}></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="companyLogo"
              render={({ field: { value, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>Company Logo</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      {...fieldProps}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        fieldProps.onChange(file);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="locationType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location type </FormLabel>
                  <FormControl>
                    <Select {...field} defaultValue="">
                      <option value="" hidden>
                        Select an option
                      </option>
                      {locationTypes?.map((type) => (
                        <option value={type} key={type}>
                          {type}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location type </FormLabel>
                  <FormControl>
                    <LocationInput
                      ref={field.ref}
                      onLocationSelected={field.onChange}
                    />
                  </FormControl>
                  {form.watch("location") && (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          form.setValue("location", "", {
                            shouldValidate: true,
                          });
                        }}
                      >
                        <X size={20} />
                      </button>
                      <span className="text-sm">{form.watch("location")} </span>
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-2">
              <Label htmlFor="applicationEmail">How to apply</Label>
              <div className="flex justify-between gap-1">
                <FormField
                  control={form.control}
                  name="applicationEmail"
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormLabel>Application email</FormLabel>
                      <FormControl>
                        <Input
                          id="applicationEmail"
                          placeholder="Email"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="applicationUrl"
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormLabel>Application url</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            form.trigger("applicationEmail");
                          }}
                          id="applicationUrl"
                          placeholder="Url"
                          type="url"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="grow">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <RichTextEditor
                        onChange={(draft) =>
                          field.onChange(draftToMarkdown(draft))
                        }
                        ref={field.ref}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="salary"
                render={({ field }) => (
                  <FormItem className="grow">
                    <FormLabel>Salary</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader2Icon className="size-4 animate-spin" />
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
};

export default NewJobForm;
